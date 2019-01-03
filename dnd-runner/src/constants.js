export const RESOURCE_FIELDS = {
    campaign: [
        { name: 'name', type: 'text', label: 'Name', value: '' },
        { name: 'description', type: 'text', label: 'Description', value: '' }
    ],
    player: [
        { name: 'name', type: 'text', label: 'Name', value: '' },
        { name: 'health', type: 'number', label: 'Health', value: 0 },
        {
            name: 'current_health',
            type: 'number',
            label: 'Current Health',
            value: 0
        },
        {
            name: 'carry_capacity',
            type: 'number',
            label: 'Carry Capacity',
            value: 0
        }
    ],
    battle: [
        { name: 'name', type: 'text', label: 'Name', value: '' },
        {
            name: 'description',
            type: 'text',
            label: 'Description',
            value: ''
        }
    ],
    enemy: [
        { name: 'name', type: 'text', label: 'Name', value: '' },
        { name: 'health', type: 'number', label: 'Health', value: 0 },
        {
            name: 'current_health',
            type: 'number',
            label: 'Current Health',
            value: 0
        }
    ],
    item: [
		{
			name: 'player_id',
			type: 'select',
			label: 'Player',
			value: 0,
			values: 'Players',
			global: true
		},
        {
            name: 'name',
            type: 'text',
            label: 'Name',
            value: ''
        },
        {
            name: 'weight',
            type: 'number',
            label: 'Weight',
            value: 0
        }
    ]
};
