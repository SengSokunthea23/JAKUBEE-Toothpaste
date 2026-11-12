import { Config } from '@remotion/cli/config';

Config.setVideoImageFormat('jpeg');
Config.setJpegQuality(95);
Config.setOverwriteOutput(true);
Config.setPixelFormat('yuv420p');
Config.setConcurrency(null); // use all CPU cores
