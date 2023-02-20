import app from "./app";

import { PORT } from "./config/env";

app.listen(PORT, () => console.log(`App Listening on Port:${PORT}`));
