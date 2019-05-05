import { IVideos, Video } from '../app/models/videos';
import { ADD_VIDEO_LIST_ITEM, CLEAR_VIDEO_LIST, ADD_VIDEO_IFRAME, ADD_CHANNEL_THUMBNAIL, RESET_STATE } from './actions';


export interface IAppState {
    videosList: IVideos[];
    lastUpdate: Date;
    video: IVideos;
    chnlThumbnail: string;
}

export const INITIAL_STATE: IAppState = {
    videosList: [],
    lastUpdate: new Date(),
    video: {} as IVideos,
    chnlThumbnail: ''
};

export function rootReducer(state: IAppState, action): IAppState {
    switch (action.type) {
        case ADD_VIDEO_IFRAME:
            return Object.assign({}, state, {
                video: action.video,
                lastUpdate: new Date()
            });
        case CLEAR_VIDEO_LIST:
            return Object.assign({}, state, {
                videosList: [],
                lastUpdate: new Date()
            });
        case ADD_VIDEO_LIST_ITEM:
            return Object.assign({}, state, {
                videosList: state.videosList.concat(Object.assign({}, action.videosList)),
                lastUpdate: new Date()
            });
        case ADD_CHANNEL_THUMBNAIL:
            return Object.assign({}, state, {
                chnlThumbnail: action.channelThumbnailUrl,
                lastUpdate: new Date()
            });
        case RESET_STATE:
            return Object.assign({}, state, {
                videosList: [],
                lastUpdate: new Date(),
                video: {} as IVideos,
                chnlThumbnail: ''
            });
    }
    return state;
}
