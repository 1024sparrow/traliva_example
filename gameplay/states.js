$initState:{
    $gui:{
        $bnModeBooks: true,
        $bnModeMusic: false
    },
    $booksOrMusic: 'books',
    // $books: $Traliva.$initData.books - должна быть предусмотрена возможность передавать инициализирующие данные, которые должны формироваться "на-лету", соответственно, они не могут входить в результат компиляции, и присваиваются уже "вдогонку". В этих данных нельзя использовать символ '$'. Для удобства "вклейки" инициализирующих данных результирующий gameplay.js делится на две части - ДО объекта с инициализирующими данными (1.js) и ПОСЛЕ (2.js). Во время выдачи контента пользователю, скрипт должен быть сшит в единый gameplay.js из 1.js, 2.js и инициализирующего объекта.
    $books:{
        current:{
            book: undefined, // не id, а порядковый номер в списке
            fragment: undefined,
            block: undefined
        },
        list:[
            {
                id: 123, // для формирования URL на загрузку
                author: 'АСПушкин',
                title: 'Руслан и Людмила',
                fragmCount: 3
            },
            {
                id: 124, // для формирования URL на загрузку
                author: 'Борис Васильев',
                title: 'А зори здесь тихие',
                fragmCount: 4
            },
        ]
    },
    // $music: $Traliva.$initData.music
    $music:{
        current: undefined,
        list:[
            {
                url: 'test_data/music/alb_1',
                title: 'album 1'
            },
            {
                url: 'test_data/music/alb_2',
                title: 'album 2'
            },
            {
                url: 'test_data/music/alb_3',
                title: 'album 3'
            },
        ],
        player:{ // $index формируется исходя из URL, $url уже подставляется логикой
            index: undefined,
            url: '',
            pos: undefined
        }
    }
},
$tree:[
    {
        books:{ // /books
            $substate: '$booksOrMusic',
            $name: '$books'
        },
        book:{ // /book/5
            $substate: '$booksOrMusic',
            $name: '$books'
            $params: [
                '$books/$current/$book',
                '$books/$current/$fragment=0',
                '$books/$current/$block=0'
            ]
        },
        music:{ // /music
            $substate: '$booksOrMusic',
            $name: '$music',
            $d:[
                {
                    album:{ // /music/album/5
                        $substate: '$music/$current',
                        $params:['$music/$current'],
                        $d:[
                            {
                                track:{ // /music/album/5/track/2
                                    $substate: '$music/$player/$index',
                                    $params: ['$music/$player/$index']
                                }
                            }
                        ]
                    }
                }
            ]
        }
    }
],
$stateSubscribers:[
]
