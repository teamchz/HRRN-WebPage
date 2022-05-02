function sortByArrival(at, n) {

    for (let i =0; i<n-1; i++) {
        for (let j = i+1; j < n; j++) {
            if (at[i] > at[j]) {
                let buff = at[i]
                at[i] = at[j]
                at[j] = buff
            }
        
        }
    }
}

myForm.addEventListener('submit', (e) => {

    const x = document.getElementById("table")
    x.classList.remove("d-none")
    const y = document.getElementById("outputText")
    y.textContent = ""

    var arrival_time, burst_time

    e.preventDefault();
    arrival_time = at.value.split(" ").map(function(item) {
        return parseInt(item)
    })

    burst_time = bt.value.split(" ").map(function(item) {
        return parseInt(item)
    })
    
    var sum_bt = 0
    var avgwt = 0
    var avgTT = 0
    var n = arrival_time.length

    var completed = Array(n).fill(0)
    var waiting_time = Array(n).fill(0)
    var turnaround_time = Array(n).fill(0)
    var complete_time = Array(n).fill(0)

    process = []

    for (let i=0; i<n; i++) {
        process.push(String.fromCharCode(65+i))
        sum_bt = sum_bt + burst_time[i]
    }

    sortByArrival(arrival_time, n)
    var t = arrival_time[0]
    var count = 0

    while (t < sum_bt) {
        var hrr = -999
        var temp = 0
        var loc = 0

        for (let i=0; i<n; i++) {
            if (arrival_time[i] <= t && completed[i] != 1) {
                temp = ((burst_time[i] + (t-arrival_time[i])) / burst_time[i])

                if (hrr < temp) {
                    hrr = temp
                    loc = i
                }
            }
        }

        t = t + burst_time[loc]

        waiting_time[loc] = (t - arrival_time[loc] - burst_time[loc])

        turnaround_time[loc] = t - arrival_time[loc]

        complete_time[loc] = turnaround_time[loc] + arrival_time[loc]

        avgTT += turnaround_time[loc]

        completed[loc] = 1

        avgwt += waiting_time[loc]

        
        var table = document.getElementById("table-body")
        var row = table.insertRow(-1)
        var cell0 = row.insertCell(0)
        var cell1 = row.insertCell(1)
        var cell2 = row.insertCell(2)
        var cell3 = row.insertCell(3)
        var cell4 = row.insertCell(4)
        var cell5 = row.insertCell(5)

        cell0.innerHTML = process[loc]
        cell1.innerHTML = arrival_time[loc]
        cell2.innerHTML = burst_time[loc]
        cell3.innerHTML = complete_time[loc]
        cell4.innerHTML = turnaround_time[loc]
        cell5.innerHTML = waiting_time[loc]

        const node = document.createElement("p")
        node.className = "border fs-4 text-center"
        const textNode = document.createTextNode(process[loc])
        node.appendChild(textNode)
        document.getElementById("gantt-chart").appendChild(node)

        if (count == 0) {
            const node2 = document.createElement("p")
            node2.className = "border-1 fs-6 text-center"
            const textNode2 = document.createTextNode(arrival_time[0])
            node2.appendChild(textNode2)
            document.getElementById("gantt-chart-num").appendChild(node2)
            count++
        }
        
        const node2 = document.createElement("p")
        node2.className = "border-1 fs-6 text-center"
        const textNode2 = document.createTextNode(complete_time[loc])
        node2.appendChild(textNode2)
        document.getElementById("gantt-chart-num").appendChild(node2)
        

    }

    var table = document.getElementById("table-body")
    var row = table.insertRow(-1)
    var cell0 = row.insertCell(0)
    cell0.colSpan = "4"
    var cell1 = row.insertCell(1)
    var cell2 = row.insertCell(2)

    cell0.innerHTML = "Average Time"
    cell1.innerHTML = avgTT / n
    cell2.innerHTML = avgwt / n
})

