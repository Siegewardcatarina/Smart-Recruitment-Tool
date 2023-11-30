import os
from secret import OPENAI_API_KEY
from langchain.llms import OpenAI
from langchain.globals import set_llm_cache
from langchain.cache import InMemoryCache
from langchain_experimental.agents.agent_toolkits import create_csv_agent

os.environ["OPENAI_API_KEY"] = OPENAI_API_KEY 
set_llm_cache(InMemoryCache())


def create_agent():
    
    #Model
    model = "gpt-3.5-turbo-instruct"

    #LLM
    llm = OpenAI(temperature = 0, model=model)

    #Dataset
    dataset = "dataset\Employee.csv"

    #Creates the agent on function call with llm and dataset provided
    return create_csv_agent(llm,dataset,verbose=True)


def query():

    # Collect user query
    print("Enter Query Below : ")
    query = input()

    # Add it with Pre-made prompt to get result in specific format
    prompt = (
        """
            For the following query, if it requires drawing a table, reply as follows:
            {"table": {"columns": ["column1", "column2", ...], "data": [[value1, value2, ...], [value1, value2, ...], ...]}}

            If the query requires creating a bar chart, reply as follows:
            {"bar": {"columns": ["A", "B", "C", ...], "data": [25, 24, 10, ...]}}

            If the query requires creating a line chart, reply as follows:
            {"line": {"columns": ["A", "B", "C", ...], "data": [25, 24, 10, ...]}}

            If the query requires creating a pie chart, reply as follows:
            {"pie": {"columns": ["A", "B", "C", ...], "data": [25%, 24%, 10%, ...]}}

            There can only be three types of chart, "pie", "bar" and "line".

            If it is just asking a question that requires none, reply as follows:
            {"answer": "answer"}
            Example:
            {"answer": "The title with the highest rating is 'Gilead'"}

            If you do not know the answer, reply as follows:
            {"answer": "I do not know."}

            Return all output as a string.

            All strings in "columns" list and data list, should be in double quotes,

            For example: {"columns": ["title", "ratings_count"], "data": [["Gilead", 361], ["Spider's Web", 5164]]}

            Lets think step by step.

            Below is the query.
            Query: 
            """
        + query
    )
    return prompt


def respond():
    agent = create_agent()
    # Run the prompt through the agent.
    while True:
        response = agent.run(query())
        # Convert the response to a string.
        print(response)


if __name__ == "__main__":
    respond()