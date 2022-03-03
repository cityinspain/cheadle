# cheadle

cheat at wordle!

## to do

### upgrade yellow letter input to account for position

for instance, we know that "t" and "d" aren't in position 2, since 
they came back yellow.
so, we should filter out words that have either of those in 
position 2

| _   | _   | i   | _   | _   |
| --- | --- | --- | --- | --- |
| a   | t   |     | e   |     |
|     | d   |     |     |     |

---

### support having letters in both yellow and green (or gray and green) to handle double letters.

---

### prevent duplicate letters in yellow and gray fields

---
### refactor into components