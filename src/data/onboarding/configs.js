import {CallBackProps, STATUS} from "react-joyride";

export const FIRST_TOUR_CONF = {
    continuous: true,
    showSkipButton: true,
    tour_name: "first",
    require_tours: [],
    callback: (data) => {
        const { action, index, origin, status, type } = data;
        if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
            localStorage.setItem("tour_passed_first", true)
        }
    },
    steps: [
        {
            target: '#navbar-posts-link',
            content: 'Здесь находятся все твои посты и проекты',
            disableBeacon: true
        },
        {
            target: '.c-post-cat-pills',
            content: 'Здесь можно выбрать, какие из них отображать',
            disableBeacon: true
        },
        {
            target: '#add-project-button',
            content: 'Эта кнопка создает новый проект',
            disableBeacon: true
        },
        {
            target: '#search-projects-field',
            content: 'Здесь можно выполнить поиск по проектам',
            disableBeacon: true
        }
    ]
}

export const ADD_PROJECT_TOUR_CONF = {
    callback: (data) => {
        const { action, index, origin, status, type } = data;
        if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
            localStorage.setItem("tour_passed_add_project", true)
        }
    },
    require_tours: [],
    tour_name: "add_project",
    continuous: true,
    showSkipButton: true,
    steps: [
        {
            target: '#name',
            content: 'Здесь задаем имя проекта',
            disableBeacon: true
        },
        {
            target: '#channel-list',
            content: 'Можно сразу выбрать каналы для добавления' +
                'в проект (а можно и оставить пустым)',
            disableBeacon: true
        },
        {
            target: '#participant-list',
            content: 'Можно сразу выбрать каналы для добавления' +
                'в проект (а можно и оставить пустым)',
            disableBeacon: true
        }
    ]
}


export const VIEW_PROJECT_TOUR_CONF = {
    callback: (data) => {
        const { action, index, origin, status, type } = data;
        if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
            localStorage.setItem("tour_passed_view_project", true)
        }
    },
    require_tours: ["add_project"],
    tour_name: "view_project",
    continuous: true,
    showSkipButton: true,
    steps: [
        {
            target: '.c-project-card',
            content: 'Это ваш проект',
            disableBeacon: true
        },
        {
            target: '.c-create-post',
            content: 'Здесь можно добавить пост в этот проект',
            disableBeacon: true
        }
    ]
}