<template>
    <div class="my-auto">
        <slot />
        <div class="border-primary mx-auto mt-1 flex h-full w-11/12 flex-wrap border border-solid">
            <div class="relative h-5/6 w-full">
                <!-- <div class="w-full text-center">大俠發功成果</div> -->
                <slot name="graph"></slot>
            </div>
            <span class="mx-auto text-xs">總時長：<slot name="duration"></slot></span>
            <div class="my-2 flex w-full"><slot name="level" /></div>
        </div>
        <table class="border-primary mx-auto mt-2 w-11/12 border border-solid">
            <tr>
                <td class="border-primary w-6 border border-solid p-1 text-center text-lg leading-tight">
                    <slot name="levelString" />
                </td>
                <td class="border-primary w-20 border border-solid text-center">
                    <slot name="image" />
                </td>
                <td class="border-primary border border-solid p-0">
                    <table class="w-full">
                        <tr class="border-primary h-12 border-b border-solid text-sm">
                            <td class="text-center"><slot name="poem" /></td>
                        </tr>
                        <tr class="">
                            <td class="p-1">
                                <div class="mb-2 flex pl-6 text-sm">
                                    <div class="border-primary mx-2 w-6 rounded-full border border-solid text-center">
                                        宜
                                    </div>
                                    <slot name="do" />
                                </div>
                                <div class="flex pl-6 text-sm">
                                    <div class="border-primary mx-2 w-6 rounded-full border border-solid text-center">
                                        忌
                                    </div>
                                    <slot name="dont" />
                                </div>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
            <tr class="border-primary border-b border-solid">
                <td colspan="2">
                    <div class="text-primary my-3 text-right">大俠心境：</div>
                </td>
                <td colspan="1">
                    <div class="flex">
                        <slot name="mood" />
                    </div>
                </td>
            </tr>
            <tr class="border-primary border-x border-solid">
                <td colspan="2">
                    <div class="text-primary mt-3 text-right">俠客風範：</div>
                </td>
                <td></td>
            </tr>
            <tr class="border-primary border-b border-solid">
                <td></td>
                <td colspan="2">
                    <div class="mr-8 mb-3 flex text-sm">
                        <slot name="style" />
                    </div>
                </td>
            </tr>
            <tr class="border-primary border-x border-solid">
                <td colspan="2">
                    <div class="text-primary mt-3 text-right">今日運勢：</div>
                </td>
                <td></td>
            </tr>
            <tr class="border-primary border-b border-solid">
                <td></td>
                <td colspan="2">
                    <div class="mb-4 flex text-sm">
                        <slot name="luck" />
                    </div>
                </td>
            </tr>
        </table>
        <div class="my-2 text-center text-sm">*截圖分享你是哪類武功奇才*</div>
    </div>
</template>
