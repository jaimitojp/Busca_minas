const gameContainer = document.getElementById("game");
    const NUM_ROWS = 10;
    const NUM_COLS = 10;
    const NUM_MINES = 10;
    let mineLocations = [];

    function createBoard() {
      for (let row = 0; row < NUM_ROWS; row++) {
        for (let col = 0; col < NUM_COLS; col++) {
          const cell = document.createElement("div");
          cell.classList.add("cell");
          cell.dataset.row = row;
          cell.dataset.col = col;
          cell.addEventListener("click",                         handleCellClick);
          gameContainer.appendChild(cell);
        }
      }
    }

    function generateMines() {
      let numMines = 0;
      while (numMines < NUM_MINES) {
        const row = Math.floor(Math.random() *                 NUM_ROWS);
        const col = Math.floor(Math.random() *                 NUM_COLS);
        const mineLocation = { row, col };
        if (!isMineLocationDuplicate(mineLocation)) {
          mineLocations.push(mineLocation);
          numMines++;
        }
      }
    }

    function isMineLocationDuplicate(location) {
      return mineLocations.some(existingLocation => {
        return existingLocation.row === location.row           && existingLocation.col === location.col;
      });
    }

    function handleCellClick(event) {
      const cell = event.target;
      const row = parseInt(cell.dataset.row);
      const col = parseInt(cell.dataset.col);
      evaluateCoordinates(row, col);
    }

    function evaluateCoordinates(row, col) {
      if (isMineLocation(row, col)) {
        revealAllCells();
        alert("¡BOOM! Explotó una bomba. ¡Perdiste!");
      } else {
        const numAdjacentMines =                               countAdjacentMines(row, col);
        const cell = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
        cell.textContent = numAdjacentMines;
        cell.classList.add("revealed");
      }
    }

    function isMineLocation(row, col) {
      return mineLocations.some(location => {
        return location.row === row && location.col === col;
      });
    }

    function revealAllCells() {
      const cells = document.getElementsByClassName("cell");
      for (let i = 0; i < cells.length; i++) {
        const cell = cells[i];
        cell.classList.add("revealed");
        if (isMineLocation(parseInt(cell.dataset.row), parseInt(cell.dataset.col))) {
          cell.classList.add("mine");
        }
      }
    }

    function countAdjacentMines(row, col) {
      const adjacentOffsets = [
        { row: -1, col: -1 },
        { row: -1, col: 0 },
        { row: -1, col: 1 },
        { row: 0, col: -1 },
        { row: 0, col: 1 },
        { row: 1, col: -1 },
        { row: 1, col: 0 },
        { row: 1, col: 1 },
      ];
      let count = 0;
      for (let i = 0; i < adjacentOffsets.length; i++) {
        const offset = adjacentOffsets[i];
        const adjRow = row + offset.row;
        const adjCol = col + offset.col;
        if (isMineLocation(adjRow, adjCol)) {
          count++;
        }
      }
      return count;
    }

    createBoard();
    generateMines();