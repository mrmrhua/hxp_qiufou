package com.houxiaopang;

import com.houxiaopang.util.JsonUtil;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * author robin on 2017/11/13.
 */
@ControllerAdvice
public class GlobalExceptionHandler {

    /**
     * 系统异常处理
     *
     * @param e
     * @return
     */
    @ExceptionHandler(value = Exception.class)
    @ResponseBody
    public String defaultErrorHandler(Exception e) {
        return JsonUtil.errorResp(-1, e.getLocalizedMessage());
    }
}
