import os
from secret import OPENAI_API_KEY
from langchain.llms import OpenAI
from langchain_experimental.agents.agent_toolkits import create_csv_agent
from langchain.chains.conversation.memory import ConversationBufferMemory


dataset = "./dataset/Employee.csv"
os.environ["OPENAI_API_KEY"] = OPENAI_API_KEY

dataset = "dataset\Cars.csv"
model = "text-davinci-003"


def app():
    # conversation memory
    memory = ConversationBufferMemory()

    while True:
        # Create CSV agent
        agent = create_csv_agent(
            OpenAI(temperature=0, model=model), memory=memory, verbose=True
        )
        # user query
        print("Enter Query: ")
        query = input()
        agent.run(query)


if __name__ == "__main__":
    app()
