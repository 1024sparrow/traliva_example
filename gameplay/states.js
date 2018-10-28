$initState:{
    $gui:{
        $bnModeBooks: true,
        $bnModeMusic: false
    },
    $booksOrMusic: 'books',
    $books:{
        $current:{
            $book: undefined, // не id, а порядковый номер в списке
            $fragment: undefined,
            $block: undefined
        },
        $list:[
            {
                $id: 123, // для формирования URL на загрузку
                $author: 'АСПушкин',
                $title: 'Руслан и Людмила',
                $fragmCount: 3
            },
            {
                $id: 124, // для формирования URL на загрузку
                $author: 'Борис Васильев',
                $title: 'А зори здесь тихие',
                $fragmCount: 4
            },
        ]
    },
    $music:{
        $current: undefined,
        $list:[
            {
                $url: 'test_data/music/alb_1',
                $title: 'album 1'
            },
            {
                $url: 'test_data/music/alb_2',
                $title: 'album 2'
            },
            {
                $url: 'test_data/music/alb_3',
                $title: 'album 3'
            },
        ],
        $player:{ // $index формируется исходя из URL, $url уже подставляется логикой
            $index: undefined,
            $url: '',
            $pos: undefined
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
