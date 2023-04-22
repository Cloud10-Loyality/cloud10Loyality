import { PORT } from ".";
import app from ".";

app.listen(PORT, () => {
    console.log(`Server is running on 🚀 http://localhost:${PORT}`)
})