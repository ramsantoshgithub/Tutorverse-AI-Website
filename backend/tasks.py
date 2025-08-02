from crewai import Task  # type: ignore

class TutorAppTasks:
    def describe(self,agent):
        task=Task(
            description="You are an expert tutor. Based on the topic provided as {user_prompt}, write a clear and engaging explanation of the topic that a high school student can understand. Use examples, analogies, and structured formatting (like steps, bullet points, etc.).",
            expected_output=(
            "Your explanation should:\n"
                "- Start with a brief overview of the topic in plain language, as if you're talking to a curious student.\n"
                "- Dive into the core idea step-by-step, using simple terms. Break down big words, and explain the 'why' and 'how'.\n"
                "- Use relatable examples or analogies — the kind you'd use in a classroom or with a friend.\n"
                "- Keep your tone warm, clear, and human. No over-formality or robotic tone.\n"
                "- Optionally, suggest how someone could visualize the topic (if it's helpful).\n"
                "- End with a quick summary of the main idea, so the learner walks away with clarity."
            ),
            agent=agent,
        )
        return task
    def resource(self,agent,context):
        task=Task(
            description="Search for and suggest educational resources such as videos ,articles and links related to {user_prompt}.",
            expected_output=(
                "With an attractive titles for each section"
                "1. A section 'Articles & Web Resources' with 2 useful links and brief descriptions.\n"
                "2. A section 'YouTube Videos' with 1–2 video links and brief descriptions.\n"
                "3. Format everything in Markdown style — links with titles and one-line descriptions. Avoid long paragraphs."
            ),
            agent=agent,
            context=[context],
            async_execution=True
        )
        return task
    def quiz_task(self,agent,context):
        task=Task(
            description=(
                "Based on the topic '{user_prompt}', generate atleast {n} questions.The difficulty of questions must be high "
            ),
            expected_output=(
                "A list of quiz questions correct answers in the end of each question in brackets."
            ),
            agent=agent,
            context=[context]
        )
        return task