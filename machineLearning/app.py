from flask import Flask, request
from flask_cors import CORS, cross_origin
from langchain_experimental.llms.ollama_functions import OllamaFunctions
from langchain_core.prompts import ChatPromptTemplate
from langchain_experimental.tools import PythonAstREPLTool
import ollama

import pandas as pd
import json

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route("/", methods=["POST"])
def home():
    model = "llama3.2"

    # Paths to input and output files
    jSon = request.get_json()

    # llm = OllamaFunctions(model="llama3.2", temperature=0)
    


   
    # df = pd.DataFrame(jSon['content'])
    # tool = PythonAstREPLTool(locals={"df": df})
    # llm_with_tools = llm.bind_tools([tool], tool_choice=tool.name)    

    # try:
    #     print(llm_with_tools.invoke("What data do you have"))
    # except ValueError:
    #     print("Well, that didn't work")




    # return json.dumps('something')
    

    str = ""
    try:
        str = jSon['content']
    except KeyError:
        return {"content" : "not a key"}
    

    print(str)


    # Prepare the prompt for the model
    prompt = f"""
    You are an assistant that categorizes each description in this bank statement.

    Here is a tuple of all the bank descriptions

    {str}

    Please:

    1. Categorize these items into appropriate/closest categories as either Food, Entertainment, Work, or Micellaneous. 
    2. Present the categorized list in a clear and organized manner
    3. Count up the number of descriptions in each category 
    4. Give me an analysis on my spending percentage on each category

    


    """

    value = {"content" : "none"}
    # Send the prompt and get the response
    try:
        response = ollama.generate(model=model, prompt=prompt)
        generated_text = response.get("response", "")
        print("==== Categorized List: ===== \n")
        print(generated_text)
        return {"content" : generated_text}

        # Write the categorized list to the output file

    except Exception as e:
        print("An error occurred:", str(e))

    return value


if __name__ == '__main__':
    app.run(debug=True)





