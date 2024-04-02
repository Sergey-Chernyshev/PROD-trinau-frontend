import {CallBackProps, STATUS} from "react-joyride";

export const FIRST_TOUR_CONF = {
    continuous: true,
    showSkipButton: true,
    tour_name: "first",
    require_tours: [],
    require_queries: [],
    callback: (data) => {
        const { action, index, origin, status, type } = data;
        if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
            localStorage.setItem("tour_passed_first", true)
        }
    },
    steps: [
        {
            target: '.c-posts-page',
            content: 'Здесь находятся все твои посты и проекты',
            disableBeacon: true
        },
        {
            target: '.c-posts-cat-pills',
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


export const ADD_POST_TOUR_CONF = {
    callback: (data) => {
        const { action, index, origin, status, type } = data;
        if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
            localStorage.setItem("tour_passed_add_post", true)
        }
    },
    require_tours: [],
    tour_name: "add_post",
    continuous: true,
    showSkipButton: true,
    steps: [
        {
            target: '#name',
            content: 'Здесь указываем название поста',
            disableBeacon: true
        },
        {
            target: '#project-select',
            content: 'Здесь указываем проект, в котором создаем пост',
            disableBeacon: true
        },
        {
            target: '#channel-select',
            content: 'Здесь указываем каналы, куда этот пост будет опубликован',
            disableBeacon: true
        },
        {
            target: '#fileUploader',
            content: 'Здесь можно прикрепить фото и видео к посту',
            disableBeacon: true
        },
        {
            target: '#content-field',
            content: 'Тут пишем сам пост',
            disableBeacon: true
        },
        {
            target: '.ai-button',
            content: 'Можно воспользоваться ИИ-помощником',
            disableBeacon: true
        },
        {
            target: '#schedule-fields',
            content: 'Здесь указываем время публикации (но можно и оставить пустым -' +
                ' тогда пост будет считаться черновиком',
            disableBeacon: true
        }
    ]
}