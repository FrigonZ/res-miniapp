import { DishBucket, DishProps } from '../constant/entity';

export const checkAndAdd = (bucket: DishBucket[], dish: DishProps) => {
  const index = bucket.findIndex((item) => item.did === dish.did);
  if (index > -1) {
    const newOptions = [
      ...bucket[index].options,
      dish.options || [{}],
    ];
    bucket[index].options = newOptions;
  } else {
    bucket.push({
      ...dish,
      options: [dish.options || [{}]],
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

export const calcPrice = (bucket: DishBucket[]) => {
  let price = 0;
  bucket.forEach((item) => {
    item.options.forEach(() => {
      price += item.price;
    });
  });
  return price;
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
