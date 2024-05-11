from flask import Flask, render_template
import pygame.mixer

app = Flask(__name__)

# Define a playlist of songs
playlist = [
    "G:\\python\\song_play\\MY Music List\\asd.mp3",
    "G:\\python\\song_play\\MY Music List\\xyz.mp3",

]

current_song_index = 0  # Index of the currently playing song
is_playing = False      # Flag to track if music is currently playing

def play_current_song():
    global is_playing
    pygame.mixer.music.load(playlist[current_song_index])
    pygame.mixer.music.play()
    is_playing = True

def toggle_pause():
    global is_playing
    if is_playing:
        pygame.mixer.music.pause()
        is_playing = False
    else:
        pygame.mixer.music.unpause()
        is_playing = True

def play_next_song():
    global current_song_index
    current_song_index = (current_song_index + 1) % len(playlist)
    play_current_song()

def play_previous_song():
    global current_song_index
    current_song_index = (current_song_index - 1) % len(playlist)
    play_current_song()

@app.route('/')
def index():
    return render_template('music.html')

@app.route('/play')
def play_music():
    global is_playing
    if not is_playing:
        pygame.mixer.init()
        play_current_song()
    return 'Music is playing'

@app.route('/pause')
def pause_music():
    toggle_pause()
    if is_playing:
        return 'Music resumed'
    else:
        return 'Music paused'

@app.route('/next')
def next_song():
    play_next_song()
    return 'Next song is playing'

@app.route('/previous')
def previous_song():
    play_previous_song()
    return 'Previous song is playing'

if __name__ == '__main__':
    app.run(debug=True)
