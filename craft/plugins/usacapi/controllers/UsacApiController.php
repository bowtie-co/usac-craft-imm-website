<?php
/**
 * usac api plugin for Craft CMS
 *
 * UsacApi Controller
 *
 * @author    IMM
 * @copyright Copyright (c) 2018 IMM
 * @link      https://imm.com
 * @package   UsacApi
 * @since     1.0.0
 */

 namespace Craft;

 class UsacApiController extends BaseController
 {

   /**
   * @var    bool|array Allows anonymous access to this controller's actions.
   * @access protected
   */
   protected $allowAnonymous = true;
   private $arrResponse = [
       'success' => false,
       'errors' => []
   ];
  /**
   */
  // public function actionIndex()
  // {
  //   $this->respond();
  // }
  // private function respond() {
  //     echo $this->returnJson($this->arrResponse);
  // }
  public function actionIndex()
  {
    echo "HI";
  }
 }
