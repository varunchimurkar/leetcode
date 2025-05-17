import { pollBatchResults, submitBatch } from "../libs/judge0.lib.js"


export const executecode = async (req, res) => {



    try {

        const { source_code, language_id, stdin, expected_output, problemId } = req.body

        const userId = req.user.id

        //Validate test cases

        if (!Array.isArray(stdin) || stdin.length === 0 ||
            !Array.isArray(expected_output) || expected_output.length !== stdin.length) {
            return res.status(400).json({ error: "Invaild or Missing test cases" })
        }

        //Prepare each test cases for judge0 batch submission

        const submission = stdin.map((input) => ({
            source_code,
            language_id,
            stdin:input

        }))

        //send batch of submission to judge0

        const submitResponse = await submitBatch(submission)
        
        const tokens = submitResponse.map((res) => res.token)

        // poll judge0 for results of all submited test cases

        const results = await pollBatchResults(tokens)
        
        console.log('Result --------', results)

        res.status(200).json({

            message : "code executed"

        })

    } catch (error) {

    }
}