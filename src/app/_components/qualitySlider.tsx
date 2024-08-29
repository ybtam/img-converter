import React, { useState } from "react";
import "./slider-tooltip.css";
import InfoIcon from "@/assets/info";

interface QualitySliderProps {
  onQualityChange: (quality: number) => void;
}

const QualitySlider: React.FC<QualitySliderProps> = ({ onQualityChange }) => {
  const [quality, setQuality] = useState(0.85);
  const [showTooltip, setShowTooltip] = useState(false);

  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuality = parseFloat(event.target.value);
    setQuality(newQuality);
    onQualityChange(newQuality);
  };

  const handleMouseOver = () => {
    setShowTooltip(true);
  };

  const handleMouseOut = () => {
    setShowTooltip(false);
  };

  return (
    <div className="flex flex-col items-center mb-4 relative">
      <div className="flex items-center justify-between mb-2">
        <label htmlFor="qualitySlider" className="mr-4">
          Quality: {Math.round(quality * 100)}%
        </label>
        <div
          className="relative cursor-pointer"
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
        >
          <Popover>
            <PopoverTrigger asChild>
              <Button className={'h-6 w-6 bg-transparent'} size={'icon'} variant={'outline'}>
                ?
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <p>
                85% is the original quality of the image. <br />
                Increasing above 85% increases size and quality of the image.
                <br />
                Decreasing below 85% reduces size and quality of the image.
              </p>
            </div>
          )}
        </div>
      </div>
      <input
        type="range"
        min="0.1"
        max="1"
        step="0.01"
        value={quality}
        onChange={handleSliderChange}
        className="w-64"
      />
    </div>
  );
};
            </PopoverContent>
          </Popover>

export default QualitySlider;
