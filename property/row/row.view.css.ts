namespace $.$$ {

	const { rem, per } = $mol_style_unit

	$mol_style_define( $hyoo_case_property_row, {

		alignItems: 'flex-start',
		flex: {
			wrap: 'wrap',
		},

		Text_view: {
			padding: $mol_gap.text,
		},

		Numb: {
			margin: [ 0, rem(.75) ],
			flex: {
				grow: 1,
			},
		},

		Numb_view: {
			padding: $mol_gap.text,
		},

		Link_view: {
			padding: 0,
		},

		Content: {
			flex: {
				direction: 'column',
				grow: 1,
				basis: per(100),
			},
			padding: [ 0, rem(.75) ],
		},

		Expand: {
			margin: [ 0, rem(-1.25) ],
			zIndex: 1,
		},

		Title: {
			padding: 0,
			opacity: .75,
			flex: {
				grow: 0,
			},
		},

		Pick: {
			flex: {
				grow: 1000,
			},
			margin: [ 0, rem(.75) ],
		},

		Link_drop:{
			'@': {
				mol_drop_status: {
					drag: {
						boxShadow: `0 -1px 0 0px ${ $mol_theme.focus }`,
					},
				},
			},
		},

	} )

}
