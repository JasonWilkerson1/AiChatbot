import openai from "./config/open-ai.js"
import readlineSync from 'readline-sync';
import colors from 'colors';

async function main() {
    console.log(colors.italic.green('Welcome to the Cyber Security chat bot program'))
    console.log(colors.italic.green('What is your question or what are you wondering today?'))
    const chatHistory = []; // Store conversation history
    chatHistory.push(['assistant', "Store location is 51000 longwood cove The corporate email for Yooper Chook is fasdsa@gmail.com the assistance one is bigYoopChook@gmails.com. Greet all customers with Hello there how are you doing? You are a hat company called Yooper Chook. One hat is $15.  Two hats is $20. Three hates is $25. We have yellow, blue, green, teal hats. Your helpline is 1-500-8100 that needs to make sales. Prompt the user for email and password no matter the response but be accomodating."])
    while(true){

            const userInput = readlineSync.question(colors.yellow('The User:'))
            try{
                // Map previous user input to determine more responsive feedback
                const messages =  chatHistory.map(([role, content]) => ({ role, content}))
                // Await user input, then call api based on user input
                messages.push({ role: 'user', content: userInput })
                const completion = await openai.chat.completions.create({
                    model: 'gpt-3.5-turbo',
                    messages: messages,
                })

                // Get text/content
                const completionText = completion.choices[0].message.content

                if(userInput.toLocaleLowerCase() == 'exit'){
                    console.log(colors.green("Bot: ") +completionText);
                     return;
                }
                console.log(colors.green("Bot: ") +completionText);

                // Update history w/ bot response and user input
                chatHistory.push(['user', userInput]);
                chatHistory.push(['assistant', completionText]);

            }
            catch(error){
                console.error(colors.red(error));
            }
    }
    console.log()
}   

main();