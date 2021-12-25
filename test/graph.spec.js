class Graph {
  constructor(v) {
    this.v = v
    this.list = { ...Array.from({ length: v }).map(() => ({})) }
    this.len = 0
  }

  addEdge(i, j, undirected = true) {
    this.list[i][j] = true

    if (undirected) {
      this.list[j][i] = true
    }
  }

  printGraph() {
    Object.entries(this.list).forEach(([node, nbrsObj]) => {
      const nbrs = Object.keys(nbrsObj).filter(nbrKey => nbrsObj[nbrKey])
      console.log(`${node} --> ${nbrs.join(', ')}`)
    })
  }

  bfs(source) {
    source = String(source)

    const queue = [source]
    const visited = { [source]: true }

    while (queue.length > 0) {
      // Do some work for every node
      const nodeId = queue.shift()
      console.log(nodeId)

      const nodeNbrs = this.list[nodeId]
      const nbrsList = Object.keys(nodeNbrs)
      nbrsList.forEach(nbrId => {
        if (!visited[nbrId]) {
          queue.push(nbrId)
          visited[nbrId] = true
        }
      })
    }
  }
}

const g = new Graph(7)
g.addEdge(0, 1)
g.addEdge(0, 4)
g.addEdge(1, 2)
g.addEdge(2, 3)
g.addEdge(3, 4)
g.addEdge(3, 5)
g.addEdge(4, 5)
g.addEdge(5, 6)
g.printGraph()
