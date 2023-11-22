interface TooltipInfo {
  icon: string;
  name: string;
  description: string;
  price: string;
  biggestPrice: string;
  whatAreWeDoing: string;
  direction: string;
}
export default interface TooltipMain {
  [key: string]: TooltipInfo;
}
