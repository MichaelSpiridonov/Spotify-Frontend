
![Logo](https://res.cloudinary.com/de8ns2u3x/image/upload/v1722458732/vu43pkdgi53dzd8mt8tc.png)


# Project Title

This is the frontend infrastructure of Beatify an app inspired by **Spotify**.

This app has some features of **Spotify** and visuals as if it's the same app.

This app uses the **Spotify**  API to pull data from and youtube to play the songs.

[**Here's a link to the app**](https://spotify-backend-ygvk.onrender.com/)

# Screenshots

## Desktop

![App Screenshot](https://res.cloudinary.com/de8ns2u3x/image/upload/v1724082343/vfwqdogb5vnrhkdleeat.png)

![](https://res.cloudinary.com/de8ns2u3x/image/upload/v1724074909/hko3u2wgsg6xdus69hmz.png)

## Mobile

![](https://res.cloudinary.com/de8ns2u3x/image/upload/v1724082275/qsjvcvpupubkzwqoxzvr.png)

![](https://res.cloudinary.com/de8ns2u3x/image/upload/v1724082275/zyrnkumicpjpdimnvgyl.png)
# Features

- Playing music
- Adding to your own new playlist
- Support for mobile & desktop
- Repeat, shuffle, skip, pervious, play! (Player Features)


# Run Locally

Clone the project

```bash
  git clone https://github.com/MichaelSpiridonov/Spotify-Frontend
```

Go to the project directory

```bash
  cd Spotify-Frontend
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```


# Deployment

To run with MongoDB & Backend:
```bash
  npm run dev:remote
```

This replaces the local Variables and will require you to also install the backend

To build the project 
```bash
  npm run build
```

# Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`VITE_SPOTIFY_API_CLIENTID`

`VITE_SPOTIFY_API_SECRET`

`VITE_YT_API_KEY`

