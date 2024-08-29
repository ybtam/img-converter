import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Slider } from '@/components/ui/slider'
import React from 'react'

interface QualitySliderProps {
  quality: number
  onQualityChange: (quality: number) => void
}

const QualitySlider = ({ quality,onQualityChange }: QualitySliderProps) => (
  <div className="relative flex flex-col items-center gap-2">
    <div className="flex items-center justify-between gap-4">
      <label htmlFor="qualitySlider">Quality: {Math.round(quality * 100)}%</label>
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
        </PopoverContent>
      </Popover>
    </div>
    <Slider
      className={'w-full'}
      defaultValue={[quality]}
      max={1}
      min={0.01}
      onValueChange={value => onQualityChange(value[0])}
      step={0.01}
    />
  </div>
)


export default QualitySlider
