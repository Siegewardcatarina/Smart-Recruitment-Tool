## Objective
The Objective of this Project is to develop an interactive tool using Generative AI tools to aid recruiters on their search for candidates that better fit the description.

## DataSet

The Dataset contains various attributes of potential candidates such as:
- Employee ID
- First Name 
- Last Name
- Phone Number
- Age
- Experience
- Email
- Role
- Skillsets
- Location

## LLM
[OpenAI](https://platform.openai.com/docs/api-reference) is the LLM that is used in this project.

A Zero Shot Agent is used to perform retrieval tasks on the dataset. It acts on current action only and has no memory, it uses ReAct framework to decide which tool to use, based on tool's description.

The llm model being used is text-davinci-003, this is the newer and more capable model, designed specifically for instruction-following tasks. This enables it to respond concisely and more accurately - even in zero-shot scenarios.

[Langchain](https://python.langchain.com/docs/get_started/introduction) is the Framework used on this project and it allows the seamless integration between the LLM, i.e OpenAI API and the dataset.

### Virtual Environment

```
python3 -m venv .venv
source .venv/bin/activate
```

### Installation 

```
pip install -r requirements.txt
```

## Sample Output

![Employee Experience Prompt](results\employee_experience_prompt.JPG)

## Prompts
1. How many employees are from bangalore
   ```
   {"answer": "There are 87 employees from Bangalore."}
   ```
2. Which employee has the highest experience?
   ```
   {"answer": "Manish Prakash has the highest experience."}
   ```
3. Tabulate the first 5 roles. Include the roles and the number of employees in each of these roles only. 
   ```
   {"table": {"columns": ["Role", "Number of Employees"], "data": [['AI/ML architect', 82], ['Blockchain engineer', 79], ['Cloud architect', 68], ['Cyber security', 93], ['Data scientist', 176]]}}
   ```
4. Create a pie chart, display percentage of employees of each role throughout the dataset
   ```
   {"pie": {"columns": ["Role", "proportion"], "data": [["Data scientist", 0.176], ["IoT solutions architect", 0.094], ["Cyber security", 0.093], ["Frontend developer", 0.091], ["Security Analyst", 0.084], ["AI/ML architect", 0.082], ["DevOps engineer", 0.079], ["Blockchain engineer", 0.079], ["HR", 0.078], ["Machine learning engineer", 0.076], ["Cloud architect", 0.068]]}}
   ```
5. Create a Bar chart, take Data scientist and devops role as columns, and number of employees in these roles as data values.
   ```
   {"bar": {"columns": ["Data scientist", "DevOps engineer"], "data": [176, 79]}}
   ```