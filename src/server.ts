import app from "./app";

import { PORT } from "./env";

app.listen(PORT, () => console.log(`App Listening on Port:${PORT}`));
