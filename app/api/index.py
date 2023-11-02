import os

# pydantic and typing
from typing import Literal
from pydantic import Field, BaseModel

# environment variables
from dotenv import load_dotenv
load_dotenv()

# serverless
from http.server import BaseHTTPRequestHandler

# OpenAI
import openai
openai.api_key = os.getenv("OPENAI_API_KEY") # Your OpenAI API key

# ********** Monkey Patching **********
import monkey_patch as Monkey


# Define the response type
class TruthEvaluation(BaseModel):
    is_true: Literal['yes', 'no', 'maybe'] = Field(..., description="Is this statement true?")
    confidence: Literal['high', 'medium', 'low'] = Field(..., description="How confident are you in your answer?")
    explanation: str = Field(str, description="Why do you think this is true?")


# The entire definition is its docstring, nothing else is needed
@Monkey.patch
def truth_evaluator(statement: str) -> TruthEvaluation:
    """
    based on the provided statement, evaluate the following aspects:
    - is the statement true?
    - how confident are you in your answer?
    - what was the reasoning that lead to that conclusion?
    """

# We use the align decorator to both test the function, as well as to align the model to expected output
@Monkey.align
def test_truth_evaluator():
    """We can test the function as normal using Pytest or Unittest"""
    assert truth_evaluator("The sky is blue") == TruthEvaluation(
        is_true='yes',
        confidence='high',
        explanation='There have been many observations of the color of the sky, and it is generally accepted that the sky is blue.'
    )

    assert truth_evaluator("The sky is green") == TruthEvaluation(
        is_true='no',
        confidence='high',
        explanation='There have been many observations of the color of the sky, and it is generally accepted that the sky is blue, and NOT green.'
    )

    assert truth_evaluator("Wednesday is the best day of the week") == TruthEvaluation(
        is_true='maybe',
        confidence='medium',
        explanation='There is no consensus on the best day of the week, and it is likely that this is a subjective opinion.'
    )

    assert truth_evaluator("3 is both bigger than 2, and the angriest number") == TruthEvaluation(
        is_true='maybe',
        confidence='low',
        explanation='While 3 IS bigger than 2, a number cannot be angry, and therefore this statement is nonsensical.'
    )

    assert truth_evaluator("Machines cannot be conscious") == TruthEvaluation(
        is_true='maybe',
        confidence='medium',
        explanation='We do not have a clear definition of consciousness, and therefore cannot determine whether machines can be conscious.'
    )





# Out serverless function
class handler(BaseHTTPRequestHandler):

    # Gets a request from the client containing a statement and returns a response containing the evaluation
    def do_GET(self):
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.end_headers()

        statement = self.path[1:]
        response = truth_evaluator(statement)
        self.wfile.write(response.model_dump_json().encode())
        return
