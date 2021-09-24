# Setup

Before running anything locally, create a `.env` file and initialize your env variable like so:

```bash
DB=mongodb://localhost:27017/beaf
SECRET_KEY=NSA
REACT_APP_URL=http://localhost:3000 // when cors is enabled, this will be the only origin to send requests
```

## Docker

```bash
docker-compose up
```

Visit: `localhost:5000`
