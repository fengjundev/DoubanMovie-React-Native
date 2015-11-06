package com.doubanmovie.ratingbar;

import android.widget.RatingBar;

import com.facebook.react.uimanager.ReactProp;
import com.facebook.react.uimanager.ReactShadowNode;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.ViewManager;

/**
 * Created by fengjun on 15/11/5.
 */
public class ReactRatingBarManager extends ViewManager<RatingBar, ReactShadowNode> {

    public static final String REACT_CLASS = "RCTRatingBar";

    private static final String PROP_NUM_STARS = "numStars";
    private static final String PROP_IS_INDICATOR = "isIndicator";
    private static final String PROP_RATING = "rating";
    private static final String PROP_STEP_SIZE = "stepSize";

    @Override
    public String getName() {
        return REACT_CLASS;
    }

    @Override
    public ReactShadowNode createCSSNodeInstance() {
        return new ReactShadowNode();
    }

    @Override
    protected RatingBar createViewInstance(ThemedReactContext reactContext) {
        return new RatingBar(reactContext);
    }

    @Override
    public void updateExtraData(RatingBar root, Object extraData) {
    }


    @ReactProp(name = PROP_NUM_STARS, defaultInt = 5)
    public void setNumStars(RatingBar view, final int numStars) {
        view.setNumStars(numStars);
    }

    @ReactProp(name = PROP_IS_INDICATOR, defaultBoolean = true)
    public void setIsIndicator(RatingBar view, boolean isIndicator) {
        view.setIsIndicator(isIndicator);
    }

    @ReactProp(name = PROP_RATING, defaultFloat = 4.0f)
    public void setRating(RatingBar view, float rating) {
        view.setRating(rating);
    }

    @ReactProp(name = PROP_STEP_SIZE, defaultFloat = 0.5f)
    public void setStepSize(RatingBar view, float stepSize) {
        view.setStepSize(stepSize);
    }
}
