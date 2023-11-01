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

function findStack(name) {
	const itensStacks = {
		'hp potion': 9,
		'mana potion': 9,
		'magic rock': 60
	};

	return itensStacks[name];
}

class inventory {
	constructor() {
		this.slots = new Array(10).fill('');
	}

	addInventory(item) {
		if (
			item.type === 'weapon' ||
			item.type === 'equipment' ||
			item.type === 'rune'
		) {
			// Itens únicos (weapon, equipment, rune) - procurar um slot vazio
			const emptySlotIndex = this.slots.findIndex((slot) => slot === '');
			if (emptySlotIndex !== -1) {
				this.slots[emptySlotIndex] = item;
				return `Item adicionado: ${item.name}`;
			} else {
				return 'Inventario Cheio';
			}
		} else {
			// Itens empilháveis (outros tipos) - procurar item similar para empilhar
			let remainingQty = item.qt;

			while (remainingQty > 0) {
				const itemIndex = this.slots.findIndex((slot) => {
					if (slot && slot.type === item.type) {
						return slot.name === item.name && slot.qt < slot.stack;
					}
					return false;
				});

				if (itemIndex !== -1) {
					const availableSpace =
						this.slots[itemIndex].stack - this.slots[itemIndex].qt;

					if (remainingQty <= availableSpace) {
						this.slots[itemIndex].qt += remainingQty;
						return `Item adicionado: ${item.name}`;
					} else {
						this.slots[itemIndex].qt = this.slots[itemIndex].stack;
						remainingQty -= availableSpace;
					}
				} else {
					// Verificar se o inventário está cheio
					const isFull = this.slots.every((slot) => slot !== '');
					if (isFull) {
						return 'Inventario Cheio';
					}

					// Se não estiver cheio, encontre um slot vazio e adicione o item
					const emptySlotIndex = this.slots.findIndex((slot) => slot === '');
					if (emptySlotIndex !== -1) {
						const newItem = {
							...item,
							qt: Math.min(remainingQty, item.stack)
						};
						this.slots[emptySlotIndex] = newItem;
						return `Item adicionado: ${newItem.name}`;
					}
				}
			}
		}
	}

	addItem(item) {
		const emptySlotIndex = this.slots.findIndex((slot) => slot === '');
		console.log(emptySlotIndex);
		if (emptySlotIndex !== -1) {
			this.slots[emptySlotIndex] = item;
		} else {
			return 'Inventario Cheio';
		}
	}
}

const newInventory = new inventory();

console.log(newInventory.addInventory(createItem('machado', 'weapon')));

console.log(
	newInventory.addInventory(createItem('hp potion', 'consumible', 2))
);
console.log(
	newInventory.addInventory(createItem('hp potion', 'consumible', 2))
);
console.log(
	newInventory.addInventory(createItem('hp potion', 'consumible', 8))
);
console.log(
	newInventory.addInventory(createItem('hp potion', 'consumible', 10))
);

console.log(
	newInventory.addInventory(createItem('hp potion', 'consumible', 2))
);
console.log(
	newInventory.addInventory(createItem('hp potion', 'consumible', 8))
);
console.log(
	newInventory.addInventory(createItem('hp potion', 'consumible', 10))
);


console.log(newInventory.addInventory(createItem('machado', 'weapon')));

console.log(newInventory);
