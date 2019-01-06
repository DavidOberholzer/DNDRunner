export const RESOURCE_FIELDS = {
    campaign: [
        { name: 'name', type: 'text', label: 'Name', value: '' },
        { name: 'description', type: 'text', label: 'Description', value: '' },
        { name: 'day', type: 'number', label: 'Day', value: 1 },
        { name: 'time_of_day', type: 'time', label: 'Time of Day', value: '07:30' }
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
        },
        {
            name: 'level',
            type: 'number',
            label: 'Level',
            value: 1
        },
        {
            name: 'experience',
            type: 'number',
            label: 'Experience',
            value: 0
        },
        {
            name: 'alive',
            type: 'boolean',
            label: 'Alive',
            value: true
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
        },
        {
            name: 'level',
            type: 'number',
            label: 'Level',
            value: 1
        },
        {
            name: 'alive',
            type: 'boolean',
            label: 'Alive',
            value: true
        }
    ],
    item: [
        {
            name: 'player_id',
            type: 'select',
            label: 'Player',
            value: '',
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
