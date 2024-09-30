import React from "react";

export default function QuestionsEn() {
  return (
    <>
      <h1
        className="text-center"
        style={{ color: "white", padding: "30px", backgroundColor: "#ED7200" }}
      >
        QUESTION AND ANSWER POLICY
      </h1>
      <div className="container mt-4">
        <div className="mb-4">
          <h4 className="text-orange">Question Conditions:</h4>
          <p>
            The question must be scientific and engineering only (no response
            will be provided if the question is outside the scope of
            engineering).
          </p>
          <p>The question should be concise and not a text.</p>
          <p>Only one question at a time.</p>
          <p>Avoid personal details and refrain from using personal terms.</p>
          <p>
            Inappropriate words or any content unrelated to engineering are not
            allowed.
          </p>
          <p>
            To avoid redundant questions, it is required to search for the topic
            on the website before asking the question.
          </p>
        </div>
        <div className="mb-4">
          <h4 className="text-orange">
            Answer Policy on "EyeEngineer " Website:
          </h4>
          <p>
            Answers should be written in proper Arabic, clear and understandable
            to Arab readers; English can be used in the answer.
          </p>
          <p>
            The answer should be comprehensive and explanatory for each point in
            the question.
          </p>
          <p>
            The answer must be based on scientific engineering principles only
            and should not reflect personal opinions or be quoted from forums.
          </p>
          <p>
            Avoid any form of advertising or promotion for a specific company.
          </p>
          <p>Stay away from texts unrelated to the engineering field.</p>
          <p>
            Avoid any form of personal promotion during the answer. Engineer's
            response is considered indirect promotion, and contact information
            can be placed in their profile, not in the answer. This should not
            encourage the questioner to contact or visit.
          </p>
          <p>
            Avoid mentioning the name of the questioner or any personal
            information; the<strong> " EyeEngineer "</strong> website respects
            the privacy of individuals.
          </p>
        </div>
        <div className="mb-4">
          <h4 className="text-orange">
            Respect for Other Engineers' Opinions:
          </h4>
          <p>
            Respond to the posed question and attempt to express one's point of
            view based on scientific engineering principles, avoiding personal
            biases or unrelated matters.
          </p>
          <p style={{color:'#ED7200'}}>
            {" "}
            Note: Any violation of these points will result in the immediate
            deletion of the answer without prior notification to the engineer.
          </p>
        </div>
      </div>
    </>
  );
}
