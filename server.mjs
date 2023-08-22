import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/campingtips', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to the database');

  const tipSchema = new mongoose.Schema({
    title: String,
    content: String,
  });

  const Tip = mongoose.model('Tip', tipSchema);

  app.get('/api/tips', async (req, res) => {
    try {
      const tips = await Tip.find();
      res.json(tips);
    } catch (error) {
      console.error('Error fetching tips:', error);
      res.status(500).send('An error occurred while fetching tips.');
    }
  });

  app.get('/api/tips/:tipId', async (req, res) => {
    const tipId = req.params.tipId;
    try {
      const tip = await Tip.findById(tipId);
      if (!tip) {
        return res.status(404).json({ message: 'Tip not found' });
      }
      res.json(tip);
    } catch (error) {
      console.error('Error fetching tip:', error);
      res.status(500).send('An error occurred while fetching the tip.');
    }
  });

  app.post('/api/tips', async (req, res) => {
    const newTip = new Tip({
      title: req.body.title,
      content: req.body.content,
    });

    try {
      const savedTip = await newTip.save();
      res.json(savedTip);
    } catch (error) {
      console.error('Error saving tip:', error);
      res.status(500).send('An error occurred while saving the tip.');
    }
  });

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
})
.catch((error) => {
  console.error('Error connecting to the database:', error);
});
