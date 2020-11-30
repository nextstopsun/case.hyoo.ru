namespace $.$$ {
	export class $hyoo_case_property_row extends $.$hyoo_case_property_row {

		kind() {
			return this.property().kind()
		}

		title() {
			return this.property().kind().meta_name( $mol_locale.lang() )
		}

		@ $mol_mem
		type() {
			return this.property().kind().property_kind_id()
		}

		@ $mol_mem
		title_arg() {
			return this.$.$hyoo_case_route_arg(
				this.property().entity(),
				this.property().kind(),
			)
		}

		@ $mol_mem
		label() {
			return [
				this.Title(),
				... this.pick_allowed() ? [ this.Pick() ] : [],
				... this.add_allowed() ? [ this.Add() ] : [],
			]
		}

		suggest() {
			return this.property().kind().property_suggest()
		}

		@ $mol_mem
		pick_allowed() {
			if( !this.editable() ) return false
			if( this.type() !== 'property_link' ) return false
			if( !this.suggest() ) return false
			if( this.pick_options().length === 0 ) return false
			return true
		}
		
		@ $mol_mem
		add_allowed() {
			if( this.type() !== 'property_link' ) return false
			return true
		}
		
		@ $mol_mem
		content() {
			if( this.editable() ) {
				switch( this.type() ) {
				}
			}
			switch( this.type() ) {
				case "property_string": return [ this.editable() ? this.String() : this.Text_view() ]
				case "property_text": return [ this.editable() ? this.Text() : this.Text_view() ]
				case "property_integer": return [ this.editable() ? this.Numb() : this.Text_view() ]
				case "property_boolean": return [ this.Bool() ]
				case "property_link": return this.property().links().map( ( _, i )=> this.Link_view( i ) )
				default: return []
			}
		}

		link_content( id: number ) {
			return [
				this.Link_snippet( id ),
				... this.editable() ? [ this.Drop( id ) ] : [],
			]
		}

		text( next? : string ) {
			return this.property().locale( $mol_locale.lang() , next )
		}

		numb( next? : number ) {
			return this.property().data( next ) ?? 0
		}

		bool( next? : boolean ) {
			return this.property().data( next ) === true
		}

		@ $mol_mem_key
		link_arg( index: number ) {

			return this.$.$hyoo_case_route_arg(
				this.property().entity(),
				this.property().links()[ index ]
			)

		}

		link_entity( index: number ) {
			return this.property().links()[ index ]
		}

		drop( index: number, event?: Event ) {
			event?.preventDefault()
			return this.property().target_tear( index )
		}

		add() {
			const prop = this.property()
			const target = prop.target_new()
			this.$.$hyoo_case_route_go( prop.entity(), target, true )
		}

		pick_options() {

			const exists = new Set( this.property().links() )
			const options = [] as string[]
			
			for( const scheme of this.property().kind().property_target() ) {

				for( const inst of scheme.members() ) {
					if( exists.has( inst ) ) continue
					options.push( inst.id() )
				}
			}

			return options
		}

		entity( id: string ) {
			return this.property().domain().entity( id )
		}

		pick( id: string ) {
			if( id ) {
				this.property().target_join([ this.entity( id ) ])
			}
			return ''
		}

	}
}