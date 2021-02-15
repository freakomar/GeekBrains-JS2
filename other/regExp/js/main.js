//Первое и второе задание

let str = `One: 'Hi Mary.' Two: 'Oh, hi.'
One: 'How are you doing?'
Two: 'I'm doing alright. How about you?'
    One: 'Not too bad. The weather is great isn't it?'
    Two: 'Yes. It's absolutely beautiful today.'
One: 'I wish it was like this more frequently.'
Two: 'Me too.'
One: 'So where are you going now?'
Two: 'I'm going to meet a friend of mine at the department store.'
One: 'Going to do a little shopping?'
Two: 'Yeah, I have to buy some presents for my parents.'
One: 'What's the occasion?'
    Two: 'It's their anniversary.'
One: 'That's great. Well, you better get going. You don't want to be late.'
Two: 'I'll see you next time.'
One: 'Sure. Bye.'`

console.log(str.replace(/\B'/g, '"'))


//третье задание

class SubmitForm {
    constructor () {
        this.inputName = document.querySelector('.input-name')
        this.name = document.querySelector('.name')
        this.inputPhone = document.querySelector('.input-phone')
        this.phone = document.querySelector('.phone')
        this.inputEmail = document.querySelector('.input-email')
        this.email = document.querySelector('.email')
    }

    checkAll() {
        this._checkName()
        this._checkPhone()
        this._checkEmail()
    }

    _checkName () {
        let str = this.inputName.value
        if (str.match(/^\b[a-z]+\b$/i)) {
            this.name.innerText = ''
            this.name.classList.remove('alert')
            this.inputName.classList.remove('alert')
        } else {
            this.name.innerText = 'Имя должно содержать только Латинские буквы'
            this.name.classList.add('alert')
            this.inputName.classList.add('alert')
        }
    }

    _checkPhone () {
        let str = this.inputPhone.value
        if (str.match(/^\+7\([0-9]{3}\)[0-9]{3}-[0-9]{4}$/)) {
            this.phone.innerText = ''
            this.phone.classList.remove('alert')
            this.inputPhone.classList.remove('alert')
        } else {
            this.phone.innerText = 'Телефон должен быть строго в формате +7(000)000-0000'
            this.phone.classList.add('alert')
            this.inputPhone.classList.add('alert')
        }
    }

    _checkEmail() {
        let str = this.inputEmail.value
        if (str.match(/^[a-z]+[-\.]?[a-z]+@[a-z]+\.(ru|com)$/i)) {
            this.email.innerText = ''
            this.email.classList.remove('alert')
            this.inputEmail.classList.remove('alert')
        } else {
            this.email.innerText = 'Почта должна быть вида \n mymail@mail.ru my.mail@mail.ru или my-mail@mail.ru'
            this.email.classList.add('alert')
            this.inputEmail.classList.add('alert')
        }
    }
}

let checker = new SubmitForm() 

document.querySelector('.submit-btn').addEventListener('click', e => {
    console.log(checker.checkAll())
})