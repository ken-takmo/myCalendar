'use strict'

{   
    const today = new Date();
    let year = today.getFullYear();
    let month = today.getMonth();

    console.log(today.getDate());

    const getCalendarHead = () => {
        const dates = [];
        const b = new Date(year, month, 0).getDate();
        const n = new Date(year, month, 1).getDay();
        
        for(let i = 0; i < n; i++){
            dates.unshift({
                date: b - i,
                isToday: false,
                isDisabled: true,
            })
        }
        return dates;
    }

    const getCalendarLast = () => {
        const dates = [];
        const lastDate = new Date(year, month + 1, 0).getDay();

        for(let i = 1; i < 7 - lastDate; i++){
            dates.push({
                date: i,
                isToday: false,
                isDisabled: true,
            })
        }
        return dates;
    }   

    const getCalendarBody = () => {
        const dates = [];
        const lastDate = new Date(year, month + 1, 0).getDate();
        
        for (let i = 1; i <= lastDate; i++) {
            dates.push({
                date: i,
                isToday: false,
                isDisabled: false,
            });
        }

        if(year === today.getFullYear() && month === today.getMonth()){
            dates[today.getDate() - 1].isToday = true;
        }
        
        return dates;
    }

    const clearCalendar = () => {
        const tbody = document.querySelector('tbody');

        while(tbody.firstChild){
            tbody.removeChild(tbody.firstChild);
        }
    }

    const createTitle = () => {
        const title = `${year}/${month + 1}`;
        document.getElementById('title').textContent = title;
    }

    const createWeeks = () => {
        const dates = [
            ...getCalendarHead(),
            ...getCalendarBody(),
            ...getCalendarLast(),
        ];
        const weeks = [];
        const weeksCount = dates.length / 7;
    
        for(let i = 0; i < weeksCount; i++) {
            weeks.push(dates.splice(0, 7));
        }
    
        weeks.forEach(week => {
            const tr = document.createElement('tr');
            week.forEach(date => {
                const td = document.createElement('td');
    
                td.textContent = date.date;
                if(date.isToday) {
                    td.classList.add('today');
                }
                if(date.isDisabled){
                    td.classList.add('disabled');
                }
    
                tr.appendChild(td);
            })
            document.querySelector('tbody').appendChild(tr);
        });
    }

    const createCalendar = () => {
        clearCalendar();
        createTitle();
        createWeeks();
    }
    createCalendar();

    document.getElementById('prev').addEventListener("click",() => {
        month--;
        if(month < 0){
            year--;
            month = 11;
        }
        createCalendar();
    });

    document.getElementById('next').addEventListener("click",() => {
        month++;
        if(month > 11){
            year++;
            month = 0;
        }
        createCalendar();
    });

    document.getElementById('today').addEventListener("click",() => {
        year = today.getFullYear();
        month = today.getMonth();
        createCalendar();
    });
}