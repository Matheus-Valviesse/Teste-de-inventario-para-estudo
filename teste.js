const createItem = (name, type, qt) => {
	function valid(type) {
		return type != 'weapon' && type != 'equipament' && type != 'rune';
	}

	return {
		name: name,
		type: type,
		...(valid(type) && {
			qt: qt == null || qt == '' || qt == undefined ? 1 : qt
		}),
		...(valid(type) && { stack: findStack(name) })
	};
};

function findStack(name){
	const itensStacks = {
		'hp potion': 9,
		'mana potion': 9
	};

  return itensStacks[name]
};

class inventory {
	constructor() {
		this.slots = new Array(10).fill('');
	}

	addInventory(item) {
		if (
			(item.type != 'weapon' &&
				item.type != 'equipament' &&
				item.type != 'rune') === true
		) {
			const itemInInventory = this.slots.findIndex(
				(slot) => slot.name == item.name && slot.qt < slot.stack
			);
			console.log(itemInInventory);

			if (itemInInventory != -1) {
				const maxQt = (this.slots[itemInInventory].qt += item.qt);

				if (maxQt > this.slots[itemInInventory].stack) {
					const resto = maxQt - this.slots[itemInInventory].stack;
					this.slots[itemInInventory].qt = this.slots[itemInInventory].stack;

					if (resto > 0)
						this.addItem(createItem(item.name, item.type, resto));

					return '';
				} else {
					this.slots[itemInInventory].qt = maxQt;
					return '';
				}
			}
		}

		return this.addItem(item);
	}

	addItem(item) {
		const slotVoid = this.slots.findIndex((slot) => slot === '');

		if (slotVoid != -1) {
			this.slots[slotVoid] = item;
		} else {
			return 'Inventario Cheio';
		}
	}
}

const newInventory = new inventory();

newInventory.addInventory(createItem('machado', 'weapon'));

newInventory.addInventory(createItem('hp potion', 'consumible', 2, 9));
newInventory.addInventory(createItem('hp potion', 'consumible', 2));

newInventory.addInventory(createItem('mana potion', 'consumible', 5));
newInventory.addInventory(createItem('mana potion', 'consumible', 1));
newInventory.addInventory(createItem('mana potion', 'consumible', 2));
newInventory.addInventory(createItem('mana potion', 'consumible', 5));
newInventory.addInventory(createItem('mana potion', 'consumible', 5));
newInventory.addInventory(createItem('mana potion', 'consumible', 5));
newInventory.addInventory(createItem('mana potion', 'consumible', 5));

newInventory.addInventory(createItem('machado', 'weapon'));

console.log(newInventory);
