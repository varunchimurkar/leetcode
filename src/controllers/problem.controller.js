import {db} from "../libs/db.js"
import { getJudge0LanguageId, submitBatch } from "../libs/judge0.lib.js"
import { pollBatchResults } from "../libs/judge0.lib.js"


export const createProblem = async(req, res) => {
  const {title,  description, difficulty,  tags, userId, constraints, 
    codeSnippets, referenceSolutions, examples, testcases} = req.body

if(req.user.role !== "ADMIN"){
    return res.status(403).json({
        error : "You are not allowed to create a problem" 
    })
}
  try {
     for( const [language, solutioncode] of Object.entries(referenceSolutions)){
        const languageId = getJudge0LanguageId(language)

        if(!language) {
            return res.status(400).json({
                error : `Language ${language} is not supported`
            })
        }

        const submissions = testcases.map(({input, output}) => ({
            source_code: solutioncode,
            language_id: languageId,
            stdin:input,
            expected_output:output
        }))

        const submissionsResults = await submitBatch(submissions)

        const tokens = submissionsResults.map((res) => res.token)
         
        const results = await pollBatchResults(tokens)

        for(let i=0; i < results.length; i++){
            const result = results[i];

            if(result.status.id !==3) {
                return res.status(400).json({error :` Testcase ${i+1} failed for language ${language}`})
            }
        }

        const newProblem = await db.problem.create({
             data: {
                title,  
                description, 
                difficulty,  
                tags, 
                userId, 
                constraints, 
                codeSnippets, 
                referenceSolutions, 
                examples, 
                testcases,
                userId : req.user.id
             }
        })

        return res.status(201).json(newProblem)
    }


  } catch(error) {

  }

}

export const getAllProblems = async(req, res) => {

}

export const getProblemById = async(req, res) => {
    
}

export const updateProblem = async(req, res) => {
    
}

export const deleteproblem = async(req, res) => {
    
}

export const getAllProblemsSolvedByUser = async(req, res) => {
    
}