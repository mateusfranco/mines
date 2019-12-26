let createBoard = (rows, columns) =>{
    return Array(rows).fill(0).map((_,row)=>{
        return Array(columns).fill(0).map((_,column)=>{
            return{
                row: row,
                column: column,
                opened: false,
                flagged: false,
                mined: false,
                exploded: false,
                nearMines: 0
            }
        })
    })
}

const spreadMines = (board, minesAmount) =>{
    const rows = board.length
    const coluns = board[0].length
    let mines = 0
    while (mines < minesAmount){
        const rowSel = parseInt(Math.random() * rows, 10)
        const colunSel = parseInt(Math.random() * coluns, 10)
        
        if(!board[rowSel][colunSel].mined){
            board[rowSel][colunSel].mined = true
            mines++
        }
    }
}

const createMinedBoard = (rows, coluns, mines) => {
    let board = createBoard(rows, coluns)
    spreadMines(board, mines)
    return board
}

const cloneBoard = board => {
    return board.map(rows => {
        return rows.map(field => {
            return { ...field }
        })
    })
}

const getNeighbors = (board,row,column) => {
    const neighbors = []
    const rows = [row-1, row, row+1]
    const columns = [column-1, column, column+1]
    rows.forEach(r => {
        columns.forEach(c => {
            const dif = r !== row || c !== column
            const validRow = r >= 0 && r < board.length
            const validColumn = c >= 0&& c < board[0].length
            if(dif && validRow && validColumn) neighbors.push(board[r][c])
        })
    })
    return neighbors
}

const safeNeighborhood = (board, row, column) => {
    const safes = (result, neighbor) => result && !neighbor.mined
    return getNeighbors(board,row,column).reduce(safes, true)
}

const openfield = (board, row, column) => {
    const field = board[row][column]
    if(!field.opened){
        field.opened = true
        if(field.mined){
            field.exploded = true
        }else if(safeNeighborhood(board, row, column)){
            getNeighbors(board, row, column).forEach(n => openfield(board, n.row, n.column))
        }else{
            const neighbors = getNeighbors(board, row, column)
            field.nearMines = neighbors.filter(n => n.mined).length
        }
    }
}

const fields = board => [].concat(...board)
const hasExplosion = board => fields(board).filter(field => field.exploded).length > 0
const pendding = field => (field.mined && !field.flagged) || (!field.mined && !field.opened)
const wonGame = board => fields(board).filter(pendding).length === 0
const showMines = board => fields(board).filter(field => field.mined).forEach(field => field.opened = true)


const invertFlag = (board, row, column) => {
    const field = board[row][column]
    field.flagged = !field.flagged
}

const flagsUsed = board => fields(board)
    .filter(field => field.flagged).length

export {
    createMinedBoard,
    cloneBoard,
    openfield,
    hasExplosion,
    wonGame,
    showMines,
    invertFlag,
    flagsUsed,
    }