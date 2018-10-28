$bnBooks: {
    $constructor: $TralivaKit.$Button,
    $options:{
        $title: 'Книги',
        $activeVarName: '$bnModeBooks'
    },
    $substate: '$gui'
},
$bnMusic: {
    $constructor: $TralivaKit.$Button,
    $options:{
        $title: 'Музыка',
        $activeVarName: '$bnModeMusic'
    },
    $substate: '$gui'
}
