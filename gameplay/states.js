$initState:{
    $gui:{
        $bnModeBooks: true,
        $bnModeMusic: false
    },
    $booksOrMusic: 'books',
    $books:{
        $current: undefined,
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
        $player:{
            $url: '', // boris here
        }
    }
},
$tree:[
    {
        books:{
            $substate: 'booksOrMusic',
            $name: 'books'
        },
        book:{
            $substate: 'booksOrMusic',
            $name: 'books'
            $params: ['books/current']
        },
        music:{
            $substate: 'booksOrMusic',
            $name: 'music'
        },
        album:{
            $substate: 'booksOrMusic',
            $name: 'music'
        }
    }
],
$stateSubscribers:[
]
