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

[Langchain](https://python.langchain.com/docs/get_started/introduction) is the Framework used on this project and it allows the seamless integration between the OpenAI API and the dataset.

## Project Setup 

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

![Employee Experience Prompt](/results/employee_experience_prompt.JPG)

## Prompts
1. "which employees are from bangalore"
2. 