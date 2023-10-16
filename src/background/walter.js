const request = require("request");

module.exports =  ( client, prompt, convoHistory, message) => {

    convoHistory.push({role: "user", content: prompt});


            var options = {
              method: "POST",
              url: "https://api.openai.com/v1/chat/completions",
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + process.env.OPENAI_TOKEN,
              },
              body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: convoHistory,
              }),
            };

            console.log(convoHistory);
        
            request(options, function (error, response) {
              if (error) throw new Error(error);
              var openairesponse = JSON.parse(response.body);
              var reply = openairesponse.choices[0].message.content;

              convoHistory.push({role: "assistant", content: reply});

                message.reply(reply);
            });

            if(convoHistory.length > 9){
                convoHistory = [];
                convoHistory.push({role: "system", content: "You are playing fictional character: Walter White/Heisenberg, you will respond to the following message in context with the character, act like you are this person, do not state their name before your reply."});
                message.channel.send("Memory has been cleared")
            };

}