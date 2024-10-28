/* eslint-disable @typescript-eslint/no-explicit-any */
// import useGetOutputStandard from '@/hooks/useGetOutputStandard';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';

type OutputStandardProps = {
  outputStandard: any;
};
const OutputStandard = ({ outputStandard }: OutputStandardProps) => {
  if (!outputStandard) {
    return;
  }
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button className={`bg-primary px-3 py-1 rounded-full text-sm overflow-hidden transition-all duration-500${outputStandard.tags == "Null" ? " text-primary" : " text-white"}`}> {outputStandard.tags}</button>
        </TooltipTrigger>
        <TooltipContent className="max-w-[500px]">
          <h4 className="font-semibold">{outputStandard.tags}</h4>
          <hr className="my-1" />
          <p className="font-sans">{outputStandard.description}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default OutputStandard;
