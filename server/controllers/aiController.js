const axios = require("axios");

const GROQ_API_KEY = process.env.GROQ_API_KEY;

const GROQ_ENDPOINT = "https://api.groq.com/openai/v1/chat/completions";

function formatTransactionsForAI(transactions) {
    let output = "| Date | Description | Amount |\n|---|---|---|\n";
    transactions.forEach(tx => {
      const date = new Date(tx.date).toLocaleDateString("en-US");
      output += `| ${date} | ${tx.category} | ${tx.amount} |\n`;
    });
    return output;
  }
  
  exports.getSmartInsights = async (req, res) => {
    try {
      const formatted = formatTransactionsForAI(req.body.transactions);
  
      const response = await axios.post(
        "https://api.groq.com/openai/v1/chat/completions",
        {
          model: "llama3-70b-8192", 
          messages: [
            {
              role: "system",
              content: "You are a smart finance assistant. Analyze the following financial transactions in Indian Rupees (₹) and provide smart spending insights. All currency mentioned should be in ₹.",
            },
            {
              role: "user",
              content: `Here are my transactions:\n\n${formatted}\n\nPlease analyze them.`,
            },
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );
  
      res.status(200).json({ summary: response.data.choices[0].message.content });
    } catch (err) {
      console.error(err.response?.data || err.message);
      res.status(500).json("AI error");
    }
  };