from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from crewai import Crew,LLM
from agents import TutorAppAgents
from tasks import TutorAppTasks
from dotenv import load_dotenv

load_dotenv()

app=FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

class UserRequest(BaseModel):
    user_prompt: str
    n: int=8

llm = LLM(
    model="groq/qwen/qwen3-32b"
)

agents = TutorAppAgents()
tasks=TutorAppTasks()

@app.get("/")
def Checkyy():
    return {"status":"Tutorverse is running"}
@app.post("/generate")
def generate(request:UserRequest):
    """End point to trigger the CrewAI process"""
    #Create Instances of agents
    describer = agents.Describer()
    resourcer=agents.Resource_Provider()
    quizzer=agents.Quiz_Generator()
    #Create instances of tasks
    tutor_task = tasks.describe(describer)
    provide_resource=tasks.resource(resourcer,tutor_task)
    generate_quiz=tasks.quiz_task(quizzer,tutor_task)
    crew = Crew(
        agents=[describer,resourcer,quizzer],
        tasks=[tutor_task,provide_resource,generate_quiz],
        verbose=True,
        manager_llm=llm
    )
    inputs={
        "user_prompt": request.user_prompt,
        "n":request.n
    }
    result = crew.kickoff(inputs=inputs)
    explanation=tutor_task.output.raw if tutor_task.output else "No Explanation generated"
    resources=provide_resource.output.raw if provide_resource.output else "No Resources were found"
    quiz=generate_quiz.output.raw if generate_quiz.output else "Error Generating Quiz"

    return{
        "explanation":explanation,
        "resources":resources,
        "quiz":quiz
    }
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app,host="0.0.0.0",port=8000)
