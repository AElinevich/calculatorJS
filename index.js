let start = document.getElementById('start');
let btnPlus = document.getElementsByTagName('button');
let incomePlus = btnPlus[0];
let expensesPlus = btnPlus[1];
let depositCheck  = document.querySelector('#deposit-check');
let additionalIncomeItem = document.querySelectorAll('.additional_income-item');
let budgetMonthValue = document.querySelector('.budget_month-value');
let budgetDayValue = document.querySelector('.budget_day-value');
let expensesMonthValue = document.querySelector('.expenses_month-value');
let additionalIncomeValue = document.querySelector('.additional_income-value');
let additionalExpensesValue = document.querySelector('.additional_expenses-value');
let incomePeriodValue = document.querySelector('.income_period-value');
let targetMonthValue = document.querySelector('.target_month-value');
let salaryAmount = document.querySelector('.salary-amount');
let expensesTitle = document.querySelector('input.expenses-title');
let expensesItems = document.querySelectorAll('.expenses-items');
let additionalExpensesItem = document.querySelector('.additional_expenses-item');
let targetAmount = document.querySelector('.target-amount');
let periodSelect = document.querySelector('.period-select');
let inputName = document.querySelectorAll('input');
let incomeItems = document.querySelectorAll('.income-items');
let periodAmount = document.querySelector('.period-amount');
let cancel = document.querySelector('#cancel');
let depositBank = document.querySelector('.deposit-bank');
let depositAmount = document.querySelector('.deposit-amount');
let depositPercent = document.querySelector('.deposit-percent');


let isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n)
}

inputName.forEach(item => {
    if (item.placeholder === 'Наименование' || item.placeholder === 'название' && item.placeholder !== 'Процент') {
    item.addEventListener('input', () => {
      const symbol = item.value[item.value.length - 1];
  
      if (/[А-Яа-яЁё,.!?;: ]/.test(symbol)) {
        return;
      } else {
        
        item.value = item.value.substring(0, [item.value.length - 1]);
      }
    });
}
if (item.placeholder === 'Сумма') {
    item.addEventListener('input', () => {
        if (!isNumber(item.value)){
            return item.value = "";
        }
        
        
    })
      
    
}
});


class AppData {
    constructor () {
    this.budget = 0;
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.income = {};
    this.incomeMonth = 0;
    this.addIncome = [];
    this.expenses = {};
    this.expensesMonth = 0; 
    this.addExpenses = [];
    this.deposit = false;
    this.percentDeposit = 0;
    this.moneyDeposit = 0;
    this.addExpenses = [];  
    
}
    check () {
    if(salaryAmount.value !== '') {
        start.removeAttribute('disabled'); 
    }
}
    start () {
    if(salaryAmount.value === '') {
        start.setAttribute('disabled', 'true');
        return;
    }
    let allInput = document.querySelectorAll('.data input[type = text]');
    allInput.forEach(function(item) {
        item.setAttribute('disabled', 'true');
    });
    expensesPlus.setAttribute('disabled', 'true');
    incomePlus.setAttribute('disabled', 'true');
    start.style.display = 'none';
    cancel.style.display = 'block';
       
        this.budget = +salaryAmount.value;
        this.getIncome();
        this.getExpenses();
               
        this.getExpensesMonth();
        this.getAddExpenses();
        this.getAddIncome();
        this.getInfoDeposit();
        this.getBudget();
        this.getTargetMonth();
        
        this.showResult();
};
   
    showResult () {
        const _this = this;
        budgetMonthValue.value = this.budgetMonth;
        budgetDayValue.value = this.budgetDay;
        expensesMonthValue.value = this.expensesMonth;
        additionalExpensesValue.value = this.addExpenses.join(', ');
        additionalIncomeValue.value = this.addIncome.join(', ');
        targetMonthValue.value = Math.ceil(this.getTargetMonth());
        incomePeriodValue.value = this.calcPeriod();
        periodSelect.addEventListener('input', function(){
        incomePeriodValue.value = _this.calcPeriod();            
    })
    }
    addExpensesBlock () {
        let cloneExpensesItem = expensesItems[0].cloneNode(true);
    cloneExpensesItem.value = "";
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
    expensesItems = document.querySelectorAll('.expenses-items');
    
        // let clonedNode = document.querySelector('.expenses-items').cloneNode(true);
        // this.expenses.append(clonedNode);
        // this.expenses.append(this.addExpenses);
        // let input = [...clonedNode.querySelectorAll('input')];
        // input.forEach(el => el.value = '');
        // if(document.querySelectorAll('.expenses-items').length === 3) {
        //     this.addExpenses.style.display = "none";
        // }
        
        if(expensesItems.length === 3) {
            expensesPlus.style.display = "none";
        }
    }
    addIncomeBlock () {
        let cloneIncomeItem = incomeItems[0].cloneNode(true);
        incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
        incomeItems = document.querySelectorAll('.income-items');
        if(incomeItems.length === 3) {
            incomePlus.style.display = "none";
        }
    }
    getExpenses () {
        const _this = this;
        expensesItems.forEach(function(item){
           let itemExpenses = item.querySelector('.expenses-title').value;
           let cashExpenses = item.querySelector('.expenses-amount').value;
           if(itemExpenses !== '' && cashExpenses !== '') {
            _this.expenses[itemExpenses] = cashExpenses;
           }
        });
    }
    getIncome () {
        const _this = this;
        incomeItems.forEach(function(item) {
        let itemIncome = item.querySelector('.income-title').value;
        let cashIncome = item.querySelector('.income-amount').value;
        if(itemIncome !== '' && cashIncome !== '') {
            _this.income[itemIncome] = cashIncome;
        }
    });
    for (let key in this.income) {
        this.incomeMonth += +this.income[key];
    }
    }
    getAddExpenses () {
        let addExpenses = additionalExpensesItem.value.split(',');
        const _this = this;
        addExpenses.forEach(function(item){
            item = item.trim();
            if (item !== '') {
                _this.addExpenses.push(item);
            }
        });
    }
    getAddIncome () {
        const _this = this;
        additionalIncomeItem.forEach(function(item){
            let itemValue = item.value.trim();
            if(itemValue !== '') {
                _this.addIncome.push(itemValue);
            }
        });
    }
    getExpensesMonth () {
    
        let sum = 0;
        for (const key in this.expenses) {
        sum += +this.expenses[key];
        this.expensesMonth = sum; 
        
     }
     
    }
    getBudget () {
        const monthDeposit = this.moneyDeposit * (this.percentDeposit / 100);
        this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth + +monthDeposit;
        this.budgetDay = Math.floor(this.budgetMonth / 30);

    }
    getTargetMonth () {
        return targetAmount.value / this.budgetMonth;
    }
    getStatusIncome () {
        if (this.budgetDay >= 1200) {
            return ('У вас высокий уровень дохода');
        } if (this.budgetDay >= 600 && this.budgetDay < 1200) {
            return ('У вас средний уровень дохода');
        } if (this.budgetDay < 600 && this.budgetDay > 0) {
            return ('К сожалению у вас уровень дохода ниже среднего');
        } if (this.budgetDay <= 0) {
            return ('Что-то пошло не так');
        };
        }

    getInfoDeposit () {
        if(this.deposit) {
            this.percentDeposit = depositPercent.value;
            this.moneyDeposit = depositAmount.value;

            
            // while (!isNumber(this.percentDeposit));   
    
            // do {
            //     this.percentDeposit = prompt('Какая сумма заложена?', 10000);
            //     }
            //  while (!isNumber(this.percentDeposit));        
            }
        }
   

    calcPeriod () {
        return this.budgetMonth * periodSelect.value;
    }
    changePercent () {
        const valueSelect = this.value;
        console.log(valueSelect);
        if (valueSelect === 'other') {
            console.log(depositPercent.value);
            depositPercent.style.display = "inline-block";
        
            depositPercent.addEventListener('input', function () {
                if (!isNumber(depositPercent.value) || depositPercent.value <= 0 || depositPercent.value > 100)
                 {alert('Введите корректное значение в поле проценты');
                 depositPercent.value = '';
                    start.setAttribute('disabled', 'true');
                    return;
            }
                
           else {
            start.disabled = false;
            return;
           } 
                    
            
            })
            
            
        } else {
            depositPercent.value = valueSelect;
            depositPercent.style.display = "none";
        }
        
    }
    depositHandler () {
        if(depositCheck.checked) {
            depositBank.style.display = "inline-block";
            depositAmount.style.display = "inline-block";
            this.deposit = true;
            depositBank.addEventListener('change', this.changePercent);
            
        }
        else{
            depositBank.style.display = "none";
            depositAmount.style.display = "none";
            depositPercent.style.display = "none";
            this.deposit = false;
            depositAmount.value = '';
            depositBank.value = '';
            depositPercent.value = '';
            depositBank.removeEventListener('change', this.changePercent);
        }
        }    
    reset () {
        let inputTextData = document.querySelectorAll('.data input[type = text]');
        let resultInputAll = document.querySelectorAll('.result input[type = text]');
        inputTextData.forEach(function(elem) {
            elem.value = '';
            elem.removeAttribute('disabled');
            periodSelect.value = '0';
            periodAmount.innerHTML = periodSelect.value;
        });
        resultInputAll.forEach(function(elem) {
                elem.value = '';
            });
        for (let i = 1; i < incomeItems.length; i++) {
            incomeItems[i].parentNode.removeChild(incomeItems[i]);
            incomePlus.style.display = "block";
        }
        for (let i = 1; i < expensesItems.length; i++) {
            expensesItems[i].parentNode.removeChild(expensesItems[i]);
            expensesPlus.style.display = "block";
            }
        this.income = {};
        this.incomeMonth = 0;
        this.addIncome = [];
        this.expenses = {};
        this.addExpenses = [];
        this.deposit = false;
        this.percentDeposit = 0;
        this.moneyDeposit = 0;
        this.budget = 0;
        this.budgetDay = 0;
        this.budgetMonth = 0;
        this.expensesMonth = 0; 
        
        cancel.style.display = 'none';
        start.style.display = 'block';
        incomePlus.removeAttribute('disabled');
        expensesPlus.removeAttribute('disabled');
        depositCheck.checked = false;
        depositBank.style.display = "none";
        depositAmount.style.display = "none";
        depositPercent.style.display = "none";
        depositBank.value = "";
        }

    eventsListeners () {
        start.addEventListener('click', this.start.bind(this));
        expensesPlus.addEventListener('click', this.addExpensesBlock);
        incomePlus.addEventListener('click', this.addIncomeBlock);
        salaryAmount.addEventListener('keyup', this.check);
        cancel.addEventListener('click', this.reset.bind(this)); 
        depositCheck.addEventListener('change', this.depositHandler.bind(this))
        periodSelect.addEventListener('input', function(){
            // this.getPeriod();
            periodAmount.textContent = periodSelect.value;        
        });
        }

};



const newData = new AppData();

newData.eventsListeners();   

// if (appData.getTargetMonth() < 0) {
//     console.log('Цель не будет достигнута')
// } else {
//     console.log('Цель будет достигнута через: ' + appData.getTargetMonth() + ' месяцев');
// }};

// let addExp = [];
// for (let i =0; i < appData.addExpenses.length; i++) {
//     let element = appData.addExpenses[i].trim();
//     element = element.charAt(0).toUpperCase() + element.substring(1).toLowerCase();
//     addExp.push(element);
// }