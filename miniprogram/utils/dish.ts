import { Discount, DishBucket, DishOption, DishProps } from '../constant/entity';

export const checkAndAdd = (bucket: DishBucket[], dish: DishProps) => {
  const index = bucket.findIndex((item) => item.did === dish.did);
  if (index > -1) {
    const newOptions = [
      ...bucket[index].options,
      dish.options || [],
    ];
    bucket[index].options = newOptions;
  } else {
    bucket.push({
      ...dish,
      options: [dish.options || []],
      bid: Date.now(),
    });
  }
  return bucket;
};

export const removeBucket = (bucket: DishBucket[], bid: number) => {
  const index = bucket.findIndex((item) => item.bid === bid);
  if (index === -1) return bucket;

  if (bucket[index].options.length > 1) {
    bucket[index].options.shift();
  } else {
    bucket.splice(index, 1);
  }

  return bucket;
};

export const calcPrice = (bucket: DishBucket[], optionBucket: DishBucket[], discounts: Discount[]) => {
  let price = 0;
  bucket.forEach((item) => {
    item.options.forEach(() => {
      price += item.price;
    });
  });
  optionBucket.forEach((item) => {
    item.options.forEach(() => {
      price += item.price;
    });
  });

  const discount = calcDiscount(price, discounts);

  return {
      price: price - discount.discount,
      ...discount,
  };
};

export const formatBucket = (bucket: DishBucket[]) => {
  const output: any[] = [];
  bucket.forEach((item) => {
    item.options.forEach((option) => {
      output.push({
        did: item.did,
        option,
      });
    });
  });

  console.log(bucket, output);
  return output;
};

export const stringsifyOptions = (options: DishOption[], showPrice = false): string => {
  if (!options.length) return '';
  const format = options.map((option) => {
    const { group, content } = option;
    return `${group}: ${stringsifyContent(content as any, showPrice)}`;
  });
  return format.join(' | ');
};

export const stringsifyContent = (content: Record<string, number>, showPrice = false): string => {
  if (!showPrice) return Object.keys(content).join(',');

  const tmp = [];
  for (const key in content as any) {
    if (Object.prototype.hasOwnProperty.call(content, key)) {
      tmp.push(`${key}-${content[key]}`);
    }
  }
  return tmp.join(',');
};

export const calcDiscount = (price: number, discounts: Discount[]) => {
    if (!discounts.length) return {
        discount: 0,
        distence: -1,
        offset: -1,
    };

    const index = discounts.findIndex((discount) => discount.standard <= price);
    if (index === -1) return {
        discount: 0,
        distence: discounts[discounts.length - 1].standard - price,
        offset: discounts[discounts.length - 1].discount,
    };

    if (index === 0) return {
        discount: discounts[0].discount,
        distence: -1,
        offset: -1,
    };

  
    return {
        discount: discounts[index].discount,
        distence: discounts[index - 1].standard - price,
        offset: discounts[index - 1].discount - discounts[index].discount,
    };
  };

