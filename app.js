'use strict'

const keyPadContainer = document.querySelector('.parent_container')
const createAccountMsg = document.querySelector('.create_account_msg')
const counting_down = document.querySelector('.counting_down')
const appendContactDiv = document.querySelector('.display_contact_inview')
const saveBtn = document.querySelector('.save_contact')
const viewContactContainer = document.querySelector('.view_container')
const lockLogo = document.querySelector('.lock')
const store2Drive = document.querySelector('.saveBTN')
const countDisplay = document.querySelector('.countDisplay')
const all_contact_show = document.querySelector('.all_contact_show')
const clear_data = document.querySelector('.clear_data')
const show_pin = document.querySelector('.show_pin')
const reveal_pin = document.querySelector('.reveal_pin')
const lock_show_pin = document.querySelector('.lock_show_pin')

let msgCounter = 0
let divCounter = 0
let timing;

// KEYPAD
const keypadParent = document.querySelector('.keys_0_9')
const clear = document.querySelector('.clear')
let show_input = document.querySelector('.show_input')
const pin_number_len = 4
let countDown = 20

let finalResult_for_keypad;

// SAVE BUTTON
const save_pin = document.querySelector('.save_pin')

// FORM CONTAINER
const form_container = document.querySelector('.parent_store_ct')

// VIEW CONTACT
const viewContact = document.querySelector('.view_contact')

// STORE BUTTON
const store_button = document.querySelector('.store_btn')
const chosePinMsg = document.querySelector('.chosePinMsg')
const orignalSaveToDriveBtn = document.createElement('button')
orignalSaveToDriveBtn.classList.add('orignalSaveToDriveBtn')


window.addEventListener('load', function () {
    show_input.textContent = ''
    chosePinMsg.style.display = 'none'

    if (this.localStorage.length === 0) {
        console.log('create an account')
        lockLogo.innerHTML = ''
        createAccountMsg.style.display = `block`

        slowFadeOff(createAccountMsg, 'opacity', 0, 4000)

        const stp_time = this.setInterval(function () {
            msgCounter++
            counting_down.textContent = msgCounter
            if (msgCounter === 4) {
                clearInterval(stp_time)
            }
        }, 1000)

        slowFadeOff(createAccountMsg, 'display', 'none', 4000)

        this.setTimeout(function () {
            eleSlowDisplay(chosePinMsg, 'block', 400)
            eleSlowDisplay(keyPadContainer, 'block', 400)
        }, 4000)

        creatAccount()

    } else {
        clear_data.disabled = false;
        show_pin.disabled = false;
        eleSlowDisplay(lock_show_pin, 'block', 800)
        createAccountMsg.style.opacity = 0
        chosePinMsg.textContent = `Please Re-Enter Pin`

        this.setTimeout(function () {
            createAccountMsg.style.display = 'none';
        }, 300)

        this.setTimeout(function () {
            keyPadContainer.style.display = 'flex'
            chosePinMsg.style.display = 'block'
        }, 800)


        save_pin.addEventListener('click', function () {
            onlySavePin()
            countDown = 20
            getPinFromLocalStrg(show_input)
            try {
                finalResult_for_keypad.splice(0)
            } catch {
                return;
            }
        })
    }
})

function timingFunc(ele) {

    timing = setInterval(function () {
        form_container.addEventListener('mousemove', function () {
            countDown = 20
            ele.innerHTML = `Loggin Out In:<span style="font-size:20px; background:red;">${countDown}</span>`
        })

        if (countDown === 0) {
            countDown = 0

            slowFadeOff(ele, 'display', 'none', 1000)
            slowFadeOff(form_container, 'display', 'none', 1000)
            slowFadeOff(viewContactContainer, 'display', 'none', 1000)
            // ele.innerHTML = ''

            setTimeout(function () {
                eleSlowDisplay(keyPadContainer, 'block', 400)
                eleSlowDisplay(chosePinMsg, 'block', 400)

            }, 1500)

            clearInterval(timing)
        }

        ele.innerHTML = `Loggin Out In:<span style="font-size:20px; background:red;">${countDown}</span>`
        countDown--
    }, 1000)
}

function getPinFromLocalStrg(ele_input) {
    const pin = localStorage.getItem('MY_PIN')
    if (ele_input.textContent.trim() === pin) {
        console.log('access granted')

        show_input.textContent = ''

        keyPadContainer.style.display = 'none'
        chosePinMsg.style.display = 'none'

        eleSlowDisplay(countDisplay, 'block', 900)
        eleSlowDisplay(viewContactContainer, 'flex', 900)
        eleSlowDisplay(form_container, 'flex', 900)

        timingFunc(countDisplay)

    } else {
        console.log('access denied')
        show_input.textContent = 'Invalid Pin!!'
        viewContactContainer.style.display = 'none'
        setTimeout(function () {
            show_input.textContent = ''
        }, 1000)
    }
}

keypadParent.addEventListener('click', function (e) {
    const btns = e.target.closest('.s')
    if (btns && show_input.textContent.length < 4) {
        show_input.textContent += Number(btns.textContent)
        finalResult_for_keypad = show_input.textContent.split('')
    }
})

clear.addEventListener('click', function () {
    try {
        finalResult_for_keypad.splice(-1)
        show_input.textContent = finalResult_for_keypad.toString().replaceAll(',', '')
    } catch {
        return;
    }
})

function creatAccount() {
    save_pin.addEventListener('click', function () {
        pinInput(show_input)
        onlySavePin()
        finalResult_for_keypad.splice(0)
    })
}

function onlySavePin() {
    if (localStorage.getItem('MY_CONTACT') === null) {
        return;
    } else {
        eleSlowDisplay(viewContactContainer, 'flex', 1000)
    }
}

function pinInput(ele) {
    const ele_input = ele.textContent

    // RUN IF THE PIN IS 4 DIGITS
    if (ele_input.length === 4) {
        localStorage.setItem('MY_PIN', `${ele_input}`)

        chosePinMsg.style.display = 'none'
        keyPadContainer.style.opacity = 0
        slowFadeOff(keyPadContainer, 'display', 'none', 400)

        location.reload()

        console.log('acount created!')
    } else {
        // RUN IF THE PIN IS LESS THAN 4 DIGITS

        console.log('alert something')
        viewContact.style.display = 'none'
        show_input.textContent = 'PIN must be (4) numbers!'
        setTimeout(function () {
            show_input.textContent = ''
        }, 800)
    }
}

store_button.addEventListener('click', function () {
    const inputs_parent = this.nextElementSibling

    slowFadeOff(inputs_parent.firstElementChild, 'width', `204px`, 400)
    slowFadeOff(inputs_parent.lastElementChild, 'width', `204px`, 800)
})


saveBtn.addEventListener('click', function () {
    const name_input = document.getElementById('name')
    const number_input = document.getElementById('number')

    // console.log(name_input.value, number_input.value)
    if (name_input.value.trim().length > 0 && number_input.value.trim().length > 0 && name_input.value.trim() !== '' && number_input.value.trim() !== '') {
        const div = displayContactInContainer(name_input.value, number_input.value)

        setTimeout(function () {
            div.style.opacity = 1;
            appendContactDiv.append(store2Drive)
            showSave2SDriveBtn('block')
        }, 400)
    } else {
        console.log('alert a message')

    }

    name_input.value = ''
    number_input.value = ''
})

function displayContactInContainer(name, num) {
    const html = `<div class="ct_name_num_con">
    <div style="border: 0px solid;" class="gt">
            <span class="c_icon"><i class="fas fa-user"></i></span> <span class="ct_name">${name}</span>
    </div>
    <input type="text" class="edit_name_box">
    <button class="ok_btn">ok</button>
        <div>
        <span><i class="fas fa-phone-square-alt"></i></span>
            <span class="ct_number">${num}</span>
        </div>
        <input type="number" class="edit_number_box" min="0">
        <button class="ok_btn">ok</button>
    </div>
    <div class="btn_ok_edit_con">
        <button class="edit_delete_btn bg">Edit</button>
        <button class="edit_delete_btn bh">Hide</button>
        <button class="edit_delete_btn br">Remove</button>
    </div>`

    const div = document.createElement('div')
    div.setAttribute(`data-MY_CONTACT`, `${divCounter}`)
    div.classList.add('show_ct_container')
    divCounter++
    div.insertAdjacentHTML('afterbegin', html)
    appendContactDiv.append(div)

    const editBtn = div.lastElementChild.firstElementChild
    const hide_input = div.lastElementChild.firstElementChild.nextElementSibling
    const deleteBtn = div.lastElementChild.lastElementChild

    const edit_field = div.firstElementChild.firstElementChild.nextElementSibling

    const edit_field_2 = div.firstElementChild.lastElementChild.previousElementSibling

    const inputField_1_okBtn = edit_field.nextElementSibling

    const inputField_2_okBtn = edit_field_2.nextElementSibling

    const okBtn_1 = edit_field.nextElementSibling
    const okBtn_2 = edit_field_2.nextElementSibling

    edit_btn(editBtn, edit_field, edit_field_2)

    hideInput(hide_input, edit_field, edit_field_2, inputField_1_okBtn, inputField_2_okBtn)

    removeElement(deleteBtn, div)

    updateInput(okBtn_1, edit_field, edit_field.previousElementSibling.lastElementChild)
    updateInput(okBtn_2, edit_field_2, edit_field_2.previousElementSibling.lastElementChild)

    return div
}

function updateInput(okbtn, f1, edf1) {
    okbtn.addEventListener('click', function () {
        if (f1.value.trim().length > 0 && f1.value !== '') {
            edf1.textContent = f1.value
        } else {
            f1.placeholder = 'invalid input'
        }

        setTimeout(function () {
            f1.placeholder = ''
        }, 1000)

        f1.value = ''
    })
}

function removeElement(ele, d) {
    ele.addEventListener('click', function () {
        d.remove()
        console.log(appendContactDiv.childElementCount)
        if (appendContactDiv.childElementCount === 1) {
            showSave2SDriveBtn('none')
        }
    })
}

function hideInput(ele, ef1, ef2, okb1, okb2) {
    ele.addEventListener('click', function () {
        console.log('ok')

        ef1.value = ''
        ef2.value = ''

        ef1.classList.remove('edit_name_box_effect')
        ef2.classList.remove('edit_number_box_effect')
        okb1.style.display = 'none'
        okb2.style.display = 'none'

        setTimeout(function () {
            ef1.style.display = 'none'
            ef2.style.display = 'none'
        }, 300)
    })
}

function edit_btn(ele, e1, e2) {
    ele.addEventListener('click', function () {
        const namefield_okBtn = e1.nextElementSibling
        const numberfiel_okbtn = e2.nextElementSibling
        e1.style.display = 'inline-block'
        e2.style.display = 'inline-block'
        setTimeout(function () {
            e1.classList.add('edit_name_box_effect')
            e2.classList.add('edit_number_box_effect')
            setTimeout(function () {
                namefield_okBtn.style.display = `inline-block`;
                numberfiel_okbtn.style.display = `inline-block`;
            }, 300)
        })
    })
}


function eleSlowDisplay(ele, dis, time) {
    ele.style.opacity = 0
    ele.style.display = `${dis}`
    setTimeout(function () {
        ele.style.opacity = 1
    }, `${time}`)
    return ele
}

function slowFadeOff(ele, CssStyle, value, time) {
    setTimeout(function () {
        createAccountMsg.style.opacity = 0
        ele.style[CssStyle] = value
    }, time)
}

function showSave2SDriveBtn(b) {
    store2Drive.style.display = b
}


let storeName;
let storeNum;
store2Drive.addEventListener('click', function () {
    clearInterval(timing)
    countDown = 20
    let nam = []
    let num = []
    eleSlowDisplay(viewContactContainer, 'flex', 600)
    eleSlowDisplay(orignalSaveToDriveBtn, 'block', 600)
    getDataFromDiv(appendContactDiv, nam, num)
    storeName = nam;
    storeNum = num
    displayContact()
    buildLastPage(storeName, storeNum)
    contactStorage()
    appendContactDiv.innerHTML = ''
})

function getDataFromDiv(el, k, j) {
    Array.from(el.children).forEach(function (i) {
        if (i !== store2Drive) {
            let n = i.firstElementChild.firstElementChild.lastElementChild.textContent;
            k.push(n)
            let numb = i.firstElementChild.lastElementChild.previousElementSibling.previousElementSibling.lastElementChild.textContent
            j.push(numb)
        }
    })
}

function creatObj(n, nb) {
    const obj = {
        'name': n,
        'number': nb
    }
    return obj
}

function displayContact() {
    viewContactContainer.style.display = 'none'
    form_container.style.display = 'none'
    countDisplay.style.display = 'none'
    all_contact_show.style.display = 'block'

    setTimeout(function () {
        all_contact_show.style.opacity = 1
    }, 400)

}

function buildLastPage(n, nb) {
    orignalSaveToDriveBtn.textContent = 'Save to Drive'
    n.forEach(function (i, index) {
        const html = `<span>${i}</span><span>${nb[index]}</span><span class="style_x" title="delete">X</span>`
        let ele_parent = document.createElement('div')
        ele_parent.setAttribute(`data-id`, index)
        ele_parent.classList.add('style_box')
        ele_parent.insertAdjacentHTML('afterbegin', html)
        all_contact_show.append(ele_parent)
        all_contact_show.insertAdjacentElement('afterend', orignalSaveToDriveBtn)
        takeParent(ele_parent)
    })
}

function contactStorage() {
    let result;
    if (localStorage.getItem('contact') !== null) {
        result = JSON.parse(localStorage.getItem('contact'))
    }

    try {
        result.forEach(function (i, index) {
            const html = `<span>${i.name}</span><span>${i.number}</span><span class="style_x" title="delete">X</span>`
            let ele_parent = document.createElement('div')
            ele_parent.setAttribute(`data-id`, index)
            ele_parent.classList.add('style_box')
            ele_parent.insertAdjacentHTML('afterbegin', html)
            all_contact_show.append(ele_parent)
            all_contact_show.insertAdjacentElement('afterend', orignalSaveToDriveBtn)
            takeParent(ele_parent)
        })
    } catch {
        return;
    }
}

function takeParent(eleparent) {
    eleparent.addEventListener('click', function (e) {
        console.log('works!')
        const childrenDeleBtn = e.target.closest('.style_x')
        if (childrenDeleBtn) {
            childrenDeleBtn.parentElement.remove()
        } else {
            return;
        }
    })
}

orignalSaveToDriveBtn.addEventListener('click', function () {
    contactShow(all_contact_show)
    setTimeout(function () {
        location.reload()
    }, 600)
})

function contactShow(el) {
    let x = []
    Array.from(el.children).forEach(function (i) {
        let n = i.firstElementChild.textContent
        let nb = i.firstElementChild.nextElementSibling.textContent
        x.push(creatObj(n, nb))
    })
    localStorage.setItem('contact', JSON.stringify(x))
}


viewContactContainer.addEventListener('click', function () {
    clearInterval(timing)
    countDown = 20
    let result = JSON.parse(localStorage.getItem('contact'))
    if (localStorage.getItem('contact') !== null && result.length > 0) {
        try {
            eleSlowDisplay(orignalSaveToDriveBtn, 'block', 600)
            orignalSaveToDriveBtn.textContent = 'Save to Drive'
            contactStorage()
            displayContact()
        } catch {
            return;
        }
    } else {
        return;
    }
})

clear_data.addEventListener('click', function () {
    clearData()
})

function clearData() {
    if (localStorage.length > 0) {
        let ask = confirm('Please note all DATA will be LOST!!')
        if (ask) {
            localStorage.clear()
            location.reload()
        } else {
            return;
        }
    }
}

let logicc = false
let startFrom = 0
show_pin.addEventListener('click', function () {
    showPin()
})


function showPin() {
    let pin = JSON.parse(localStorage.getItem('MY_PIN'))
    if (pin !== null) {
        reveal_pin.textContent = pin
        logicc = true

    } else {
        return;
    }

    if (logicc) {
        if (startFrom === 0) {
            reveal_pin.innerHTML = pin
            reveal_pin.classList.add('style_pin')
            reveal_pin.style.backgroundColor = 'yellowgreen';
            show_pin.textContent = 'Hide Pin'
            startFrom = 1
        } else if (startFrom === 1) {
            reveal_pin.innerHTML = ''
            reveal_pin.style.backgroundColor = ''
            show_pin.textContent = 'Show Pin'
            startFrom = 0
        }
    }
}
